<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;


class TransactionController extends Controller
{
    public function showCheckout(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $qty = $request->qty;

        return view('transactions.checkout', compact('product', 'qty'));
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $subtotal = 0;

            // HITUNG SUBTOTAL DULU
            foreach ($request->products as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($item['qty'] < 1) {
                    throw new \Exception('Jumlah tidak valid');
                }

                $subtotal += $product->harga * $item['qty'];
            }

            $ongkir = 0;
            $total  = $subtotal;

            $transaction = Transaction::create([
                'order_number'  => 'ORD-' . strtoupper(Str::random(8)),
                'user_id'       => Auth::id(),
                'nama_penerima' => $request->nama_penerima,
                'no_wa'         => $request->no_wa,
                'alamat'        => $request->alamat,
                'ekspedisi'     => $request->ekspedisi,
                'subtotal'      => $subtotal,
                'ongkir'        => $ongkir,
                'total'         => $total,
                'status'        => 'menunggu_verifikasi',
            ]);

            // 🔥 ATOMIC DECREMENT + DETAIL
            foreach ($request->products as $item) {

                $affected = Product::where('id', $item['product_id'])
                    ->where('stok', '>=', $item['qty'])
                    ->decrement('stok', $item['qty']);

                // kalau stok tidak cukup
                if ($affected === 0) {
                    throw new \Exception('Stok tidak mencukupi untuk salah satu produk.');
                }

                $product = Product::findOrFail($item['product_id']);

                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id'     => $product->id,
                    'qty'            => $item['qty'],
                    'harga'          => $product->harga,
                    'subtotal'       => $product->harga * $item['qty'],
                ]);
            }

            DB::commit();

            return redirect()->route('user.orders.show', $transaction->id)
                ->with('success', 'Pesanan berhasil dibuat. Menunggu konfirmasi admin.');

        } catch (\Exception $e) {

            DB::rollBack();

            return back()->withErrors($e->getMessage());
        }
    }

    public function adminIndex()
    {
        $orders = Transaction::orderBy('created_at', 'desc')->get();

        return view('admin.orders.index', compact('orders'));
    }

    public function adminShow($id)
    {
        $order = Transaction::with('details.product')->findOrFail($id);

        return view('admin.orders.show', compact('order'));
    }

    public function adminConfirm(Request $request, $id)
    {
        $request->validate([
            'ongkir' => 'required|integer|min:0',
        ]);

        $order = Transaction::findOrFail($id);

        $order->update([
            'ongkir'   => $request->ongkir,
            'total'    => $order->subtotal + $request->ongkir,
            'status'   => 'menunggu_pembayaran',
            'admin_id' => Auth::id(),
        ]);

        return redirect('/admin/orders/' . $id)
            ->with('success', 'Ongkir berhasil dikonfirmasi');
    }

    public function kirimOrder(Request $request, $id)
    {
        $request->validate([
            'resi' => 'required|string|max:255'
        ]);

        $order = Transaction::findOrFail($id);

        if ($order->status !== 'diproses') {
            return back()->with('error', 'Status tidak valid.');
        }

        $order->resi = $request->resi;
        $order->status = 'dikirim';
        $order->dikirim_pada = now();
        $order->admin_id = Auth::id(); // simpan admin yg proses
        $order->save();

        return back()->with('success', 'Pesanan berhasil dikirim.');
    }

    public function userOrders()
    {
        $orders = Transaction::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($o) => [
                'id'           => $o->id,
                'order_number' => $o->order_number,
                'total'        => $o->total,
                'status'       => $o->status,
                'created_at'   => $o->created_at,
            ]);

        return Inertia::render('User/Orders/Index', ['orders' => $orders]);
    }

    public function userOrderDetail($id)
    {
        $order = Transaction::with('details.product')
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return Inertia::render('User/Orders/Show', [
            'order' => [
                'id'             => $order->id,
                'order_number'   => $order->order_number,
                'status'         => $order->status,
                'subtotal'       => $order->subtotal,
                'ongkir'         => $order->ongkir,
                'total'          => $order->total,
                'nama_penerima'  => $order->nama_penerima,
                'no_wa'          => $order->no_wa,
                'alamat'         => $order->alamat,
                'ekspedisi'      => $order->ekspedisi,
                'bukti_transfer' => $order->bukti_transfer,
                'dibayar_pada'   => $order->dibayar_pada,
                'resi'           => $order->resi,
                'dikirim_pada'   => $order->dikirim_pada,
                'created_at'     => $order->created_at,
                'details'        => $order->details->map(fn ($d) => [
                    'id'    => $d->id,
                    'qty'   => $d->qty,
                    'harga' => $d->harga,
                    'product' => $d->product ? ['id' => $d->product->id, 'nama' => $d->product->nama] : null,
                ]),
            ],
        ]);
    }

    public function uploadBukti(Request $request, $id)
    {
        $request->validate([
            'bukti_transfer' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $transaction = Transaction::findOrFail($id);

        // pastikan status valid
        if ($transaction->status !== 'menunggu_pembayaran') {
            return back()->with('error', 'Status transaksi tidak valid.');
        }

        $file = $request->file('bukti_transfer');
        $path = $file->store('bukti_transfer', 'public');

        $transaction->bukti_transfer = $path;
        $transaction->status = 'diproses';
        $transaction->dibayar_pada = now();
        $transaction->save();

        return back()->with('success', 'Bukti transfer berhasil diupload.');
    }
}

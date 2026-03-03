<div class="container">

    <h2>Detail Pesanan</h2>

    <p><strong>Order:</strong> {{ $order->order_number }}</p>
    <p><strong>Penerima:</strong> {{ $order->nama_penerima }}</p>
    <p><strong>No WA:</strong> {{ $order->no_wa }}</p>
    <p><strong>Alamat:</strong> {{ $order->alamat }}</p>
    <p><strong>Status:</strong> {{ $order->status }}</p>

    {{-- Tombol hubungi customer --}}
    @php
        $customerMessage = "Halo {$order->nama_penerima}, saya admin ingin mengabari tentang pesanan #{$order->order_number}";
        $customerWaLink = "https://wa.me/".preg_replace('/\D/', '', $order->no_wa)."?text=".urlencode($customerMessage);
    @endphp
    <a href="{{ $customerWaLink }}" target="_blank" 
        class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-block my-2">
        Hubungi Customer via WhatsApp
    </a>

    <hr>

    {{-- ===================== --}}
    {{-- PRODUK --}}
    {{-- ===================== --}}
    <h4>Produk</h4>
    <ul>
        @foreach ($order->details as $detail)
            <li>
                {{ $detail->product->nama }} —
                {{ $detail->qty }} x Rp {{ number_format($detail->harga,0,',','.') }}
            </li>
        @endforeach
    </ul>

    <hr>

    {{-- ===================== --}}
    {{-- SUBTOTAL --}}
    {{-- ===================== --}}
    <p><strong>Subtotal:</strong> Rp {{ number_format($order->subtotal,0,',','.') }}</p>

    {{-- ===================== --}}
    {{-- FORM INPUT ONGKIR (MENUNGGU VERIFIKASI) --}}
    {{-- ===================== --}}
    @if ($order->status === 'menunggu_verifikasi')

        <h4>Verifikasi Pesanan</h4>

        @if ($errors->any())
            <div style="color:red;">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="/admin/orders/{{ $order->id }}/confirm" method="POST">
            @csrf

            <label>Masukkan Ongkir</label><br>
            <input type="number" name="ongkir" required min="0"><br><br>

            <button type="submit">
                Konfirmasi & Hitung Total
            </button>
        </form>

    @endif

    {{-- ===================== --}}
    {{-- FORM INPUT RESI (DIPROSES) --}}
    {{-- ===================== --}}
    @if ($order->status === 'diproses')

        <hr>
        <h4>Kirim Pesanan</h4>

        <p><strong>Ongkir:</strong> Rp {{ number_format($order->ongkir,0,',','.') }}</p>
        <p><strong>Total:</strong> Rp {{ number_format($order->total,0,',','.') }}</p>

        {{-- Bukti transfer --}}
        @if ($order->bukti_transfer)
            <p><strong>Bukti Transfer:</strong></p>
            <img src="{{ asset('storage/'.$order->bukti_transfer) }}" width="300">
        @endif

        <br>

        <form action="{{ route('admin.orders.kirim', $order->id) }}" method="POST">
            @csrf

            <label>Nomor Resi</label><br>
            <input type="text" name="resi" required><br><br>

            <button type="submit">
                Konfirmasi & Kirim
            </button>
        </form>

    @endif

    {{-- ===================== --}}
    {{-- ONGKIR & TOTAL UNTUK STATUS LAIN --}}
    {{-- ===================== --}}
    @if (!in_array($order->status, ['menunggu_verifikasi','diproses']))
        <hr>
        <p><strong>Ongkir:</strong> Rp {{ number_format($order->ongkir ?? 0,0,',','.') }}</p>
        <p><strong>Total:</strong> Rp {{ number_format($order->total ?? 0,0,',','.') }}</p>

        @if ($order->bukti_transfer)
            <p><strong>Bukti Transfer:</strong></p>
            <img src="{{ asset('storage/'.$order->bukti_transfer) }}" width="300">
        @endif

        @if (in_array($order->status, ['dikirim','selesai']))
            <p><strong>Nomor Resi:</strong> {{ $order->resi }}</p>
            <p><strong>Dikirim Pada:</strong>
                {{ $order->dikirim_pada ? \Carbon\Carbon::parse($order->dikirim_pada)->format('d M Y H:i') : '-' }}
            </p>
        @endif
    @endif

</div>
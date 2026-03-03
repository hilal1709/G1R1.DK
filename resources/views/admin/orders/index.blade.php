<h2>Pesanan Masuk</h2>

<table border="1" cellpadding="10" cellspacing="0" width="100%">
    <thead>
        <tr>
            <th>Order</th>
            <th>Penerima</th>
            <th>Total</th>
            <th>Status</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>
        @forelse ($orders as $order)
            <tr>
                <td>{{ $order->order_number }}</td>
                <td>{{ $order->nama_penerima }}</td>
                <td>Rp {{ number_format($order->total,0,',','.') }}</td>
                <td>{{ $order->status }}</td>
                <td>
                    <a href="/admin/orders/{{ $order->id }}">Detail</a>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="5">Belum ada pesanan</td>
            </tr>
        @endforelse
    </tbody>
</table>
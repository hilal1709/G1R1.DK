<div class="container">
    <h2>Pesanan Saya</h2>

    <table border="1" cellpadding="10" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Order</th>
                <th>Tanggal</th>
                <th>Total</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
        @forelse ($orders as $order)
            <tr>
                <td>{{ $order->order_number }}</td>
                <td>{{ $order->created_at->format('d-m-Y') }}</td>
                <td>
                    Rp {{ number_format($order->total,0,',','.') }}
                </td>
                <td>{{ $order->status }}</td>
                <td>
                    <a href="/orders/{{ $order->id }}">Detail</a>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="5">Belum ada pesanan</td>
            </tr>
        @endforelse
        </tbody>
    </table>
</div>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Saya</title>
</head>
<body>

    <!-- HEADER -->
    <header>
        <h2>Damar Kurung</h2>

        <nav>
            <a href="/">Beranda</a> |
            <a href="/articles">Artikel</a> |
            <a href="/products">Produk</a> |
            <a href="/events">Event</a> |
            <a href="/games">Games</a> |
            <a href="/about">Tentang</a> |
            <a href="/contact">Kontak</a> |
            <a href="/orders">Pesanan Saya</a> |

            @auth
                Halo, {{ auth()->user()->name }} |
                <form action="/logout" method="POST" style="display:inline;">
                    @csrf
                    <button type="submit">Logout</button>
                </form>
            @else
                <a href="/login">Login</a>
            @endauth
        </nav>

        <hr>
    </header>


    <!-- CONTENT -->
    <div class="container">

        <h2>Dashboard Saya</h2>

        <hr>

        <h4>Ringkasan Pesanan</h4>
        <ul>
            <li>Total Pesanan: {{ $totalOrders }}</li>
            <li>Menunggu Pembayaran: {{ $menungguPembayaran }}</li>
            <li>Menunggu Verifikasi: {{ $menungguVerifikasi }}</li>
            <li>Dikirim: {{ $dikirim }}</li>
            <li>Selesai: {{ $selesai }}</li>
        </ul>

        <hr>

        <h4>5 Pesanan Terbaru</h4>

        @if ($recentOrders->count() > 0)
            <table border="1" cellpadding="10">
                <tr>
                    <th>Order</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>

                @foreach ($recentOrders as $order)
                    <tr>
                        <td>{{ $order->order_number }}</td>
                        <td>Rp {{ number_format($order->total,0,',','.') }}</td>
                        <td>{{ $order->status }}</td>
                        <td>
                            <a href="{{ route('user.orders.show', $order->id) }}">
                                Detail
                            </a>
                        </td>
                    </tr>
                @endforeach
            </table>
        @else
            <p>Belum ada pesanan.</p>
        @endif

        <br>
        <a href="/orders">Lihat Semua Pesanan</a>

    </div>

</body>
</html>
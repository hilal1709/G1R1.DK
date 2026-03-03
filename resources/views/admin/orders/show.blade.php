<div class="container">

    <h2>Detail Pesanan</h2>

    <p><strong>Order:</strong> {{ $order->order_number }}</p>
    <p><strong>Penerima:</strong> {{ $order->nama_penerima }}</p>
    <p><strong>No WA:</strong> {{ $order->no_wa }}</p>
    <p><strong>Alamat:</strong> {{ $order->alamat }}</p>
    <p><strong>Status:</strong> {{ $order->status }}</p>

    <hr>

    {{-- ===================== --}}
    {{-- PRODUK --}}
    {{-- ===================== --}}
    <h4>Produk</h4>
    <ul>
        @foreach ($order->details as $detail)
            <li>
                {{ $detail->product->nama }} —
                {{ $detail->qty }} x 
                Rp {{ number_format($detail->harga,0,',','.') }}
            </li>
        @endforeach
    </ul>

    <hr>

    {{-- ===================== --}}
    {{-- TOTAL --}}
    {{-- ===================== --}}
    <p><strong>Subtotal:</strong> 
        Rp {{ number_format($order->subtotal,0,',','.') }}
    </p>

    <p><strong>Ongkir:</strong> 
        Rp {{ number_format($order->ongkir,0,',','.') }}
    </p>

    <p><strong>Total:</strong> 
        Rp {{ number_format($order->total,0,',','.') }}
    </p>

    <hr>

    {{-- ===================== --}}
    {{-- BUKTI TRANSFER --}}
    {{-- ===================== --}}
    @if ($order->bukti_transfer)
        <h4>Bukti Transfer</h4>
        <img src="{{ asset('storage/'.$order->bukti_transfer) }}" width="300">
        <hr>
    @endif


    {{-- ===================== --}}
    {{-- FORM INPUT RESI --}}
    {{-- ===================== --}}
    @if ($order->status === 'menunggu_verifikasi')

        <h4>Verifikasi & Kirim Pesanan</h4>

        @if ($errors->any())
            <div style="color:red;">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('admin.orders.kirim', $order->id) }}" method="POST">
            @csrf

            <label>Nomor Resi</label><br>
            <input type="text" name="resi" required><br><br>

            <button type="submit">
                Konfirmasi & Kirim
            </button>
        </form>

        <hr>
    @endif


    {{-- ===================== --}}
    {{-- INFORMASI PENGIRIMAN --}}
    {{-- ===================== --}}
    @if ($order->status === 'dikirim' || $order->status === 'selesai')

        <h4>Informasi Pengiriman</h4>

        <p><strong>Nomor Resi:</strong> {{ $order->resi }}</p>

        <p><strong>Dikirim Pada:</strong>
            {{ $order->dikirim_pada 
                ? \Carbon\Carbon::parse($order->dikirim_pada)->format('d M Y H:i') 
                : '-' 
            }}
        </p>

        <hr>
    @endif

</div>
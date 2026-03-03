<div class="container">

    <h2>Detail Pesanan</h2>

    <p><strong>Order:</strong> {{ $order->order_number }}</p>
    <p><strong>Status:</strong> {{ $order->status }}</p>

    <hr>

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

    @php
        $adminNumber = "085608767693";
        $message = "Halo Admin,%0A%0A"
            . "Saya ingin konfirmasi pesanan:%0A"
            . "Order: " . $order->order_number . "%0A"
            . "Status: " . $order->status . "%0A"
            . "Total: Rp " . number_format($order->total,0,',','.') . "%0A%0A"
            . "Mohon dibantu ya 🙏";
    @endphp

    <a href="https://wa.me/{{ $adminNumber }}?text={{ urlencode($message) }}" 
    target="_blank"
    >
        📲 Hubungi Admin via WhatsApp
    </a>

    <hr>

    {{-- ===================== --}}
    {{-- TAMPILKAN BUKTI JIKA ADA --}}
    {{-- ===================== --}}
    @if ($order->bukti_transfer)
        <h4>Bukti Transfer</h4>
        <img src="{{ asset('storage/'.$order->bukti_transfer) }}" 
            width="300">
        <hr>
    @endif

    @if (in_array($order->status, ['dikirim','selesai']))
            <p><strong>Nomor Resi:</strong> {{ $order->resi }}</p>
            <p><strong>Dikirim Pada:</strong>
                {{ $order->dikirim_pada ? \Carbon\Carbon::parse($order->dikirim_pada)->format('d M Y H:i') : '-' }}
            </p>
        @endif


    {{-- ===================== --}}
    {{-- FORM UPLOAD --}}
    {{-- ===================== --}}
    @if ($order->status === 'menunggu_pembayaran' && !$order->bukti_transfer)

        <p>Silakan lakukan pembayaran melalui:</p>
        <p><strong>BCA 123131 a.n G1R1 DK</strong></p>

        <h4>Upload Bukti Transfer</h4>

        @if ($errors->any())
            <div style="color:red;">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('transactions.upload', $order->id) }}" 
              method="POST" 
              enctype="multipart/form-data">
            @csrf

            <input type="file" 
                   name="bukti_transfer" 
                   required 
                   accept="image/*">

            <br><br>

            <button type="submit">
                Upload Bukti
            </button>
        </form>

    @endif
    
</div>
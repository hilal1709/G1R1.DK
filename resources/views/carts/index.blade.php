<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Cart Saya</title>
</head>
<body>

<h2>Keranjang Belanja</h2>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif

@php
    $total = 0;
@endphp

@if($cart->items->count() == 0)
    <p>Cart masih kosong.</p>
@else
<table border="1" cellpadding="8" cellspacing="0">
    <thead>
        <tr>
            <th>Produk</th>
            <th>Harga</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>

        @foreach($cart->items as $item)
            @php
                $subtotal = $item->product->harga * $item->qty;
                $total += $subtotal;
            @endphp
            <tr>
                <td>{{ $item->product->nama }}</td>
                <td>Rp {{ number_format($item->product->harga) }}</td>
                <td>
                    <form method="POST" action="{{ route('cartItems.update', $item) }}">
                        @csrf
                        @method('PATCH')
                        <input type="number" name="qty" value="{{ $item->qty }}" min="1" style="width:60px">
                        <button type="submit">Update</button>
                    </form>
                </td>
                <td>Rp {{ number_format($subtotal) }}</td>
                <td>
                    <form method="POST" action="{{ route('cartItems.destroy', $item) }}">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Hapus item ini?')">
                            Hapus
                        </button>
                    </form>
                </td>
            </tr>
        @endforeach

    </tbody>
</table>

<h3>Total: Rp {{ number_format($total) }}</h3>
@endif

<hr>

<h3>Order</h3>

<!-- ORDER VIA WHATSAPP -->
@php
    $waText = "*Halo Admin*\n\n";
    $waText .= "Saya ingin melakukan pemesanan dengan detail berikut:\n\n";

    foreach ($cart->items as $item) {
        $subtotal = $item->product->harga * $item->qty;
        
        $waText .= "- {$item->product->nama}\n";
        $waText .= "  SKU: {$item->product->sku}\n";
        $waText .= "  Qty: {$item->qty}\n";
        $waText .= "  Harga: Rp " . number_format($item->product->harga, 0, ',', '.') . "\n";
        $waText .= "  SubTotal: Rp " . number_format($subtotal, 0, ',', '.') . "\n\n";
    }

    $waText .= "*Total: Rp " . number_format($total, 0, ',', '.') . "*\n\n";
    $waText .= "Terima kasih";

    $waUrl = "https://wa.me/6285608767693?text=" . urlencode($waText);
@endphp

<a href="{{ $waUrl }}" target="_blank">
    <button>Order via WhatsApp</button>
</a>

</body>
</html>

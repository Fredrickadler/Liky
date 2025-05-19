<?php
// فایل: public/api/send-coins.php

// اطلاعات دریافتی رو بخون
$data = json_decode(file_get_contents('php://input'), true);

$fid = $data['fid'] ?? null;
$amount = $data['amount'] ?? null;

// اعتبارسنجی اولیه
if (!$fid || !$amount || !is_numeric($amount) || $amount <= 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid input'
    ]);
    exit;
}

// اینجا به جای ذخیره واقعی، فقط چاپ می‌کنیم برای تست
file_put_contents('coin-log.txt', "Sent $amount coins to FID $fid\n", FILE_APPEND);

// پاسخ موفق برگردون
echo json_encode([
    'success' => true
]);
?>

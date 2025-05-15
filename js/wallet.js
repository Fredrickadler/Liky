// اتصال کیف پول
async function connectWallet(connectBtnId, addressId) {
  const connectBtn = document.getElementById(connectBtnId);
  const walletAddress = document.getElementById(addressId);

  try {
    if (window.ethereum) {
      window.provider = new ethers.BrowserProvider(window.ethereum);
      await window.provider.send("eth_requestAccounts", []);
      window.signer = await window.provider.getSigner();
      window.address = await window.signer.getAddress();

      connectBtn.style.display = 'none';
      walletAddress.style.display = 'block';
      walletAddress.textContent = `${window.address.slice(0, 6)}...${window.address.slice(-4)}`;
    } else {
      alert('Please install MetaMask or another Ethereum wallet.');
    }
  } catch (error) {
    console.error("Wallet connection failed:", error);
  }
}

// تنظیم اتصال کیف پول برای تمام دکمه‌ها
function setupWalletConnections() {
  const walletButtons = [
    { btnId: 'connectWallet', addressId: 'walletAddress' },
    { btnId: 'connectWallet2', addressId: 'walletAddress2' },
    { btnId: 'connectWallet3', addressId: 'walletAddress3' },
    { btnId: 'connectWallet4', addressId: 'walletAddress4' },
    { btnId: 'connectWallet5', addressId: 'walletAddress5' }
  ];

  walletButtons.forEach(({ btnId, addressId }) => {
    const connectBtn = document.getElementById(btnId);
    const walletAddress = document.getElementById(addressId);

    connectBtn?.addEventListener('click', () => connectWallet(btnId, addressId));

    walletAddress?.addEventListener('click', () => {
      connectBtn.style.display = 'inline-block';
      walletAddress.style.display = 'none';
      window.signer = null;
      window.address = null;
    });
  });
}

document.addEventListener('DOMContentLoaded', setupWalletConnections);

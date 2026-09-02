export function InstagramCard() {
  return (
    <a
      className="instagram-card"
      href="https://www.instagram.com/pranjetaaa/"
      target="_blank"
      rel="noreferrer"
      aria-label="Visit pranjetaaa on Instagram"
    >
      <img className="instagram-avatar" src="assets/pranjetaaa-profile.jpg" alt="Luka Pranjeta" />
      <span className="instagram-profile">
        <strong>pranjetaaa</strong>
        <span className="instagram-name">Luka Pranjeta</span>
        <span className="instagram-stats">
          <span><b>40</b> posts</span>
          <span><b>119</b> followers</span>
        </span>
      </span>
      <span className="instagram-cta">View on Instagram</span>
    </a>
  );
}

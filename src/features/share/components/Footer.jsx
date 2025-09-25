import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-section footer-left">
          <ul>
            <li><a href="#">Aviso Legal</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Política de Cookies</a></li>
            <li><a href="#">Política de Calidad</a></li>
          </ul>
        </div>

        <div className="footer-section footer-center">
          <div className="footer-logo">Shop-Stev</div>
          <div className="footer-social">
            <a href="https://www.facebook.com/share/18irTXGtQM/" target="_blank" rel="noreferrer" title="Facebook">
              <FaFacebookF /> 
            </a>
            <a href="#" target="_blank" rel="noreferrer" title="Twitter">
              <FaTwitter /> 
            </a>
            <a href="https://www.instagram.com/s1evex/" target="_blank" rel="noreferrer" title="Instagram">
              <FaInstagram /> 
            </a>
            <a href="#" target="_blank" rel="noreferrer" title="LinkedIn">
              <FaLinkedinIn /> 
            </a>
          </div>
        </div>

        <div className="footer-section footer-right">
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#footer">Contacto</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Shop-Stev | Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;

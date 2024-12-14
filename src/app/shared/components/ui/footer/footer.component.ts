import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h2 class="footer-title">Don Pepe SuperMarket S.A.C.</h2>
          <ul class="footer-list">
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Políticas y condiciones</a></li>
            <li><a href="#">Conócenos</a></li>
            <li><a href="#">Responsabilidad</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h2 class="footer-title">Ayuda</h2>
          <ul class="footer-list">
            <li><a href="#">Tutorial de compra</a></li>
            <li><a href="#">Horarios atención telefónica y social</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h2 class="footer-title">Información</h2>
          <ul class="footer-list">
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Cambios y devoluciones</a></li>
          </ul>
        </div>
        <div class="footer-copyright">
          <p>&copy; 2024 Don Pepe SuperMarket S.A.C.</p>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}

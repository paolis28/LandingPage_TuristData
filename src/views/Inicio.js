import React, { useState } from "react";
import { BarChart3, TrendingUp, MapPin, Calendar, Bell, Smartphone, Users, Target, PieChart } from 'lucide-react';
import '../styles/Inicio.css';
import { Link } from "react-router-dom";
const Inicio = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      alert('¡Gracias por tu interés! Te contactaremos pronto.');
      setEmail('');
    } else {
      alert('Por favor ingresa un correo válido');
    }
  };

  const hanldeLoginButtonHover = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  };

  const handleLoginButtonLeave = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  };

  const hanldeRegisterButtonHover = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  };

  const handleRegiterButtonLeave = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  };

  const handleContactButtonHover = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  };

  const handleContactButtonLeave = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  };

  const handlePrimaryButtonHover = (e) => {
    e.target.style.backgroundColor = '#f3f4f6';
    e.target.style.transform = 'scale(1.05)';
  };

  const handlePrimaryButtonLeave = (e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.transform = 'scale(1)';
  };

  const handleFeatureCardHover = (e) => {
    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
  };

  const handleFeatureCardLeave = (e) => {
    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
  };

  const handleEmailButtonHover = (e) => {
    e.target.style.backgroundColor = '#f3f4f6';
    e.target.style.transform = 'scale(1.05)';
  };

  const handleEmailButtonLeave = (e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.transform = 'scale(1)';
  };

  return (
    <div className='container'>
      {/* Header */}
      <header className='header'>
        <nav className='nav'>
          <div className='logo'>
            <MapPin style={{ height: '2rem', width: '2rem', color: 'white' }} />
            <span className='logoText'>TurismoData MX</span>
          </div>
          
          <div className='navButtons'>
            <Link to="/contacto">
              <button 
                className='contactButton'
                onMouseEnter={handleContactButtonHover}
                onMouseLeave={handleContactButtonLeave}
              >
                Contacto
              </button>
            </Link>

            <Link to="/login">
              <button 
                className='contactButton'
                onMouseEnter={hanldeLoginButtonHover}
                onMouseLeave={handleLoginButtonLeave}>
                Login 
              </button>
            </Link>

            <Link to="/register">
              <button 
                className='contactButton'
                onMouseEnter={hanldeRegisterButtonHover}
                onMouseLeave={handleRegiterButtonLeave}
              >
                Registro 
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className='heroSection'>
        <div className='heroContainer'>
          <div className='heroCard'>
            <h1 className='heroTitle'>
              Datos Turísticos
              <span className='heroSubtitle'>
                Inteligentes
              </span>
            </h1>
            <p className='heroDescription'>
              Optimiza tu negocio turístico con datos actualizados sobre tendencias de visita en los destinos más populares de México
            </p>
            <div className='heroButtons'>
              <button 
                className='primaryButton'
                onMouseEnter={handlePrimaryButtonHover}
                onMouseLeave={handlePrimaryButtonLeave}
              >
                Conocer Más
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className='problemSection'>
        <div className='sectionContainer'>
          <div className='sectionHeader'>
            <h2 className='sectionTitle'>
              El Problema que Resolvemos
            </h2>
            <p className='sectionDescription'>
              Los negocios turísticos en México enfrentan desafíos críticos por falta de información estratégica
            </p>
          </div>
          
          <div className='problemGrid'>
            <div className='problemCard problemCardRed'>
              <div className='iconContainer iconContainerRed'>
                <Target style={{ height: '2rem', width: '2rem', color: 'white' }} />
              </div>
              <h3 className='cardTitle'>Publicidad Mal Planificada</h3>
              <p className='cardDescription'>Las campañas no coinciden con los momentos de mayor demanda turística</p>
            </div>
            
            <div className='problemCard problemCardOrange'>
              <div className='iconContainer iconContainerOrange'>
                <BarChart3 style={{ height: '2rem', width: '2rem', color: 'white' }} />
              </div>
              <h3 className='cardTitle'>Falta de Datos Procesables</h3>
              <p className='cardDescription'>No hay herramientas accesibles para entender cuándo y dónde hay más afluencia</p>
            </div>
            
            <div className='problemCard problemCardYellow'>
              <div className='iconContainer iconContainerYellow'>
                <TrendingUp style={{ height: '2rem', width: '2rem', color: 'white' }} />
              </div>
              <h3 className='cardTitle'>Desconocimiento de Tendencias</h3>
              <p className='cardDescription'>Sin análisis claro de cómo varía el turismo a lo largo del tiempo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='featuresSection'>
        <div className='sectionContainer'>
          <div className='sectionHeader'>
            <h2 className='sectionTitle'>
              Funcionalidades Principales
            </h2>
            <p className='sectionDescription'>
              Todo lo que necesitas para tomar decisiones estratégicas basadas en datos reales
            </p>
          </div>
          
          <div className='featuresGrid'>
            {[
              { icon: MapPin, title: "Destinos Más Visitados", description: "Conoce los destinos turísticos más populares de México con datos actualizados" },
              { icon: Calendar, title: "Patrones Temporales", description: "Identifica temporadas altas, bajas, feriados y tendencias estacionales" },
              { icon: PieChart, title: "Herramientas Visuales", description: "Gráficos interactivos y comparativas anuales fáciles de entender" },
              { icon: Target, title: "Recomendaciones Personalizadas", description: "Sugerencias estratégicas para planificar ofertas y promociones" },
              { icon: Bell, title: "Alertas Inteligentes", description: "Notificaciones sobre cambios en la demanda turística" },
              { icon: Smartphone, title: "Diseño Móvil", description: "Interfaz intuitiva optimizada para dispositivos móviles" }
            ].map((feature, index) => (
              <div 
                key={index}
                className='featureCard'
                onMouseEnter={handleFeatureCardHover}
                onMouseLeave={handleFeatureCardLeave}
              >
                <div className='featureIconContainer'>
                  <feature.icon style={{ height: '2rem', width: '2rem', color: 'white' }} />
                </div>
                <h3 className='featureTitle'>{feature.title}</h3>
                <p className='cardDescription'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className='targetSection'>
        <div className='sectionContainer'>
          <div className='sectionHeader'>
            <h2 className='sectionTitle'>
              ¿Para Quién es Esta App?
            </h2>
          </div>
          
          <div className='targetGrid'>
            <div className='targetList'>
              {[
                { icon: Users, title: "Emprendedores Turísticos", description: "Personas que inician o gestionan negocios en el sector turístico" },
                { icon: Target, title: "Hoteles y Restaurantes", description: "Establecimientos que buscan optimizar sus estrategias de marketing" },
                { icon: BarChart3, title: "Agencias de Viajes", description: "Profesionales que diseñan paquetes y experiencias turísticas" }
              ].map((target, index) => (
                <div key={index} className='targetItem'>
                  <div className='targetIconContainer'>
                    <target.icon style={{ height: '1.5rem', width: '1.5rem', color: 'white' }} />
                  </div>
                  <div>
                    <h3 className='targetItemTitle'>{target.title}</h3>
                    <p className='cardDescription'>{target.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className='targetCard'>
              <h3 className='targetCardTitle'>Características de Nuestros Usuarios</h3>
              <ul className='targetCardList'>
                {[
                  "Sin conocimientos técnicos avanzados",
                  "Buscan información fácil de entender",
                  "Necesitan tomar decisiones rápidas",
                  "Quieren maximizar sus ingresos"
                ].map((item, index) => (
                  <li key={index} className='targetCardItem'>
                    <div className='bullet'></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='ctaSection'>
        <div className='ctaContainer'>
          <h2 className='ctaTitle'>
            ¿Listo para Impulsar tu Negocio?
          </h2>
          <p className='ctaDescription'>
            Únete a la revolución de datos turísticos y toma decisiones más inteligentes
          </p>
          
          <div className='emailForm'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className='emailInput'
            />
            <button
              onClick={handleSubmit}
              className='emailButton'
              onMouseEnter={handleEmailButtonHover}
              onMouseLeave={handleEmailButtonLeave}
            >
              Notificarme
            </button>
          </div>
          
          <p className='emailDisclaimer'>
            Te contactaremos cuando la app esté lista para lanzamiento
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className='footer'>
        <div className='footerContainer'>
          <div className='footerLogo'>
            <MapPin style={{ height: '1.5rem', width: '1.5rem', color: '#14b8a6' }} />
            <span className='footerLogoText'>TurismoData MX</span>
          </div>
          <div className='footerText'>
            <p>© 2025 TurismoData MX. Impulsando el turismo con datos inteligentes.</p>
            <p className='footerSubtext'>Hecho con ❤️ para emprendedores mexicanos</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Inicio;
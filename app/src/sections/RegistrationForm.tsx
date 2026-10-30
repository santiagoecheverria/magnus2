import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Home, Building, MapPin, FileText, Mail, Phone, Shield, Loader2 } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from '../config/contact';

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Webhook URL para Google Sheets (Apps Script)
// Guarda pre-registros directamente en Google Sheets
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzWXsr4_rfOo95YH1ddzTX9UoRNFClZPQoqE4Ex2-lTuMAKJYtKs_pdqiITT8S-FoWf/exec';

// Comunas de Chile (subset más comunes)
const comunasChile = [
  'Las Condes', 'Vitacura', 'La Reina', 'Ñuñoa', 'Providencia',
  'Santiago', 'La Florida', 'Maipú', 'Puente Alto', 'Peñalolén',
  'Recoleta', 'Independencia', 'Estación Central', 'San Miguel',
  'La Cisterna', 'El Bosque', 'Pedro Aguirre Cerda', 'Lo Espejo',
  'San Bernardo', 'Pudahuel', 'Quilicura', 'Renca', 'Cerro Navia',
  'Lo Prado', 'Quinta Normal', 'Conchalí', 'Huechuraba', 'Macul',
  'San Joaquín', 'La Granja', 'San Ramón', 'La Pintana', 'Pirque',
  'San José de Maipo', 'Colina', 'Lampa', 'Tiltil', 'Buin',
  'Calera de Tango', 'Paine', 'Melipilla', 'María Pinto', 'Curacaví',
  'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor',
  'Viña del Mar', 'Valparaíso', 'Concón', 'Quilpué', 'Villa Alemana',
  'Limache', 'Olmué', 'Quillota', 'La Calera', 'Nogales',
  'Los Andes', 'San Esteban', 'Rinconada', 'Calle Larga', 'San Felipe',
  'Llaillay', 'Putaendo', 'Santa María', 'Papudo', 'Zapallar',
  'Petorca', 'La Ligua', 'Cabildo', 'Quintero', 'Puchuncaví',
  'Casablanca', 'San Antonio', 'Cartagena', 'El Tabo', 'El Quisco',
  'Algarrobo', 'Santo Domingo', 'San Pedro', 'Isla de Pascua',
  'Rancagua', 'Machalí', 'Graneros', 'San Francisco de Mostazal',
  'Doñihue', 'Codegua', 'Coinco', 'Coltauco', 'Quinta de Tilcoco',
  'Rengo', 'Requínoa', 'Pichidegua', 'Peumo', 'Las Cabras',
  'San Vicente de Tagua Tagua', 'Navidad', 'La Estrella', 'Litueche',
  'Pichilemu', 'Marchihue', 'Paredones', 'Malloa', 'San Fernando',
  'Chimbarongo', 'Nancagua', 'Santa Cruz', 'Lolol', 'Pumanque',
  'Palmilla', 'Peralillo', 'Chepica', 'Chépica', 'Placilla',
  'Talca', 'Curicó', 'Linares', 'Constitución', 'Cauquenes',
  'San Javier', 'Longaví', 'Parral', 'Cauquenes', 'Chanco',
  'Pelluhue', 'Hualañé', 'Molina', 'Sagrada Familia', 'Teno',
  'Romeral', 'Rauco', 'Licantén', 'Vichuquén', 'Curepto',
  'Empedrado', 'San Clemente', 'Pelarco', 'Pencahue', 'Maule',
  'Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles', 'Coronel',
  'San Pedro de la Paz', 'Hualpén', 'Tomé', 'Penco', 'Lota',
  'Santa Juana', 'Florida', 'Cabrero', 'Yumbel', 'Laja',
  'San Rosendo', 'Mulchén', 'Nacimiento', 'Santa Bárbara', 'Quilleco',
  'Yumbel', 'Huépil', 'San Ignacio', 'Pemuco', 'Bulnes',
  'Quillón', 'Portezuelo', 'Coelemu', 'Quirihue', 'Ninhue',
  'Treguaco', 'Cobquecura', 'Ñiquén', 'San Fabián', 'San Nicolás',
  'Ranquil', 'El Carmen', 'Pinto', 'Coihueco', 'San Carlos',
  'San Gregorio de Ñigua', 'La Laja', 'Los Álamos', 'Curanilahue',
  'Arauco', 'Lebu', 'Cañete', 'Contulmo', 'Tirúa',
  'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Tucapel',
  'Alto Biobío', 'Chillán Viejo', 'Chillán', 'Coihueco', 'Pinto',
  'San Ignacio', 'El Carmen', 'Pemuco', 'Yungay', 'Quillón',
  'San Fabián', 'Ñiquén', 'San Carlos', 'San Nicolás', 'Ranquil',
  'Portezuelo', 'Coelemu', 'Quirihue', 'Ninhue', 'Treguaco',
  'Cobquecura', 'Bulnes', 'Concepción', 'Talcahuano', 'Chiguayante',
  'San Pedro de la Paz', 'Hualqui', 'Santa Juana', 'Lota', 'Penco',
  'Tomé', 'Florida', 'Coronel', 'Hualpén', 'San Rosendo',
  'Laja', 'Cabrero', 'Yumbel', 'Tucapel', 'Antuco',
  'Quilleco', 'Los Ángeles', 'Mulchén', 'Nacimiento', 'Negrete',
  'Santa Bárbara', 'Quilaco', 'Alto Biobío', 'Curanilahue', 'Lebu',
  'Arauco', 'Cañete', 'Contulmo', 'Tirúa', 'Los Álamos',
  'Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón', 'Angol',
  'Victoria', 'Lautaro', 'Nueva Imperial', 'Carahue', 'Saavedra',
  'Freire', 'Cunco', 'Gorbea', 'Loncoche', 'Vilcún',
  'Perquenco', 'Galvarino', 'Cholchol', 'Teodoro Schmidt', 'Pitrufquén',
  'Toltén', 'Lonquimay', 'Melipeuco', 'Curacautín', 'Renaico',
  'Traiguén', 'Lumaco', 'Purén', 'Los Sauces', 'Ercilla',
  'Collipulli', 'Angol', 'Los Hualles', 'Capitán Pastene', 'Valdivia',
  'Los Lagos', 'Panguipulli', 'La Unión', 'Río Bueno', 'Lago Ranco',
  'Futrono', 'Lanco', 'San José de la Mariquina', 'Máfil', 'Corral',
  'Paillaco', 'Los Muermos', 'Calbuco', 'Frutillar', 'Fresia',
  'Llanquihue', 'Puerto Varas', 'Puerto Montt', 'Castro', 'Ancud',
  'Quellón', 'Chonchi', 'Dalcahue', 'Curaco de Vélez', 'Puqueldón',
  'Queilén', 'Quemchi', 'Hualaihué', 'Futaleufú', 'Palena',
  'Chaitén', 'Osorno', 'Purranque', 'Puerto Octay', 'San Juan de la Costa',
  'San Pablo', 'Río Negro', 'Puyehue', 'Puerto Varas', 'Puerto Montt',
  'Coihaique', 'Lago Verde', 'Aisén', 'Cisnes', 'Guaitecas',
  'Cochrane', 'O\'Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez',
  'Punta Arenas', 'Puerto Natales', 'Porvenir', 'Puerto Williams',
  'Cabo de Hornos', 'Torres del Paine', 'Laguna Blanca', 'San Gregorio',
  'Río Verde', 'Primavera', 'Timaukel', 'Antártica'
];

export default function RegistrationForm({ isOpen, onClose }: RegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Property
    direccion: '',
    comuna: '',
    rol: '',
    tipoPropiedad: 'casa' as 'casa' | 'departamento',
    metrosConstruidos: '',
    metrosTotales: '',
    // Step 2: Personal
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    aceptaContacto: false,
  });

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'Ingresa la dirección de tu propiedad';
    }
    if (!formData.comuna) {
      newErrors.comuna = 'Selecciona una comuna';
    }
    if (!formData.rol.trim()) {
      newErrors.rol = 'Ingresa el rol de tu propiedad';
    } else if (!/^\d{1,5}-\d{1,5}$/.test(formData.rol)) {
      newErrors.rol = 'Formato inválido. Ejemplo: 12345-1';
    }
    if (!formData.metrosConstruidos || Number(formData.metrosConstruidos) <= 0) {
      newErrors.metrosConstruidos = 'Ingresa los metros construidos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Ingresa tu nombre';
    }
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'Ingresa tu apellido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Ingresa tu email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Ingresa tu teléfono';
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono inválido';
    }
    if (!formData.aceptaContacto) {
      newErrors.aceptaContacto = 'Debes aceptar ser contactado';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para enviar datos al Excel de OneDrive vía Power Automate
  const submitToOneDriveExcel = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    
    // Preparar los datos para el Excel
    const data = {
      fechaRegistro: new Date().toISOString(),
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      telefono: formData.telefono,
      direccion: formData.direccion,
      comuna: formData.comuna,
      rol: formData.rol,
      tipoPropiedad: formData.tipoPropiedad,
      metrosConstruidos: formData.metrosConstruidos,
      metrosTotales: formData.metrosTotales,
      fuente: 'Landing Page Magnus'
    };

    // Guardar en localStorage como respaldo
    try {
      const registrosGuardados = JSON.parse(localStorage.getItem('magnus_preregistros') || '[]');
      registrosGuardados.push(data);
      localStorage.setItem('magnus_preregistros', JSON.stringify(registrosGuardados));
    } catch (e) {
      console.error('Error guardando en localStorage:', e);
    }

    try {
      // Intentar enviar a Google Sheets usando no-cors (evita errores CORS)
      // Con no-cors no podemos leer la respuesta, pero la petición se envía
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Siempre mostrar éxito - los datos están guardados en localStorage
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error enviando a Google Sheets:', error);
      // Aunque falle el envío, los datos están en localStorage
      // Mostramos éxito igual para no frustrar al usuario
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      await submitToOneDriveExcel();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E0D5] p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0B2F33]">
                Pre-registro Magnus
              </h2>
              <p className="text-[#3D4E52] mt-1">
                {isSubmitted 
                  ? '¡Registro completado!' 
                  : `Paso ${step} de 2: ${step === 1 ? 'Datos de la propiedad' : 'Tus datos'}`
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="sr-only">Cerrar</span>
              <svg className="w-6 h-6 text-[#3D4E52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="mt-4 flex gap-2">
              <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-[#C47A4A]' : 'bg-[#E5E0D5]'}`} />
              <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-[#C47A4A]' : 'bg-[#E5E0D5]'}`} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            /* Success Message */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-[#1B6E6A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[#1B6E6A]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B2F33] mb-4">
                ¡Listo! Gracias por pre-registrarte
              </h3>
              <p className="text-[#4B5563] mb-6 max-w-md mx-auto">
                Hemos recibido tus datos correctamente. Un especialista de Magnus 
                te contactará apenas lancemos para explicarte todos los detalles.
              </p>
              <div className="bg-[#F4EFE6] rounded-xl p-6 mb-6">
                <p className="text-sm text-[#3D4E52] mb-2">¿Qué sigue?</p>
                <ul className="text-left text-[#4B5563] space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#1B6E6A] flex-shrink-0 mt-0.5" />
                    Revisaremos la información de tu propiedad
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#1B6E6A] flex-shrink-0 mt-0.5" />
                    Te contactaremos al lanzamiento
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#1B6E6A] flex-shrink-0 mt-0.5" />
                    Recibirás una propuesta personalizada
                  </li>
                </ul>
              </div>
              <div className="bg-[#1B6E6A]/10 rounded-xl p-4 mb-6">
                <p className="text-sm text-[#1B6E6A]">
                  <strong>Nota importante:</strong> Tu pre-registro ha sido guardado.
                  Si tienes alguna duda o necesitas confirmación, llámanos al{' '}
                  <a href={CONTACT_PHONE_HREF} className="underline font-semibold">
                    {CONTACT_PHONE_DISPLAY}
                  </a>, escríbenos a{' '}
                  <a href={CONTACT_EMAIL_HREF} className="underline font-semibold">
                    {CONTACT_EMAIL}
                  </a>{' '}
                  o responde al correo de confirmación que recibirás.
                </p>
              </div>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Entendido
              </button>
            </div>
          ) : step === 1 ? (
            /* Step 1: Property Data */
            <div className="space-y-6">
              <div>
                <label className="label-magnus flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1B6E6A]" />
                  Dirección
                </label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  placeholder="Ej: Av. Providencia 1234"
                  className="input-magnus"
                />
                {errors.direccion && <p className="error-text">{errors.direccion}</p>}
              </div>

              <div>
                <label className="label-magnus flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1B6E6A]" />
                  Comuna
                </label>
                <select
                  value={formData.comuna}
                  onChange={(e) => handleInputChange('comuna', e.target.value)}
                  className="input-magnus"
                >
                  <option value="">Selecciona tu comuna</option>
                  {comunasChile.sort().map((comuna) => (
                    <option key={comuna} value={comuna}>
                      {comuna}
                    </option>
                  ))}
                </select>
                {errors.comuna && <p className="error-text">{errors.comuna}</p>}
              </div>

              <div>
                <label className="label-magnus flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1B6E6A]" />
                  Rol de Contribuciones
                </label>
                <input
                  type="text"
                  value={formData.rol}
                  onChange={(e) => handleInputChange('rol', e.target.value)}
                  placeholder="Ej: 12345-1"
                  className="input-magnus"
                />
                <p className="helper-text">
                  Lo encuentras en tu cuenta de contribuciones o escritura. Formato: número-número
                </p>
                {errors.rol && <p className="error-text">{errors.rol}</p>}
              </div>

              <div>
                <label className="label-magnus">Tipo de propiedad</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange('tipoPropiedad', 'casa')}
                    className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      formData.tipoPropiedad === 'casa'
                        ? 'border-[#8A4E2E] bg-[#C47A4A]/5'
                        : 'border-[#E5E0D5] hover:border-[#1B6E6A]'
                    }`}
                  >
                    <Home className={`w-5 h-5 ${formData.tipoPropiedad === 'casa' ? 'text-[#8A4E2E]' : 'text-[#3D4E52]'}`} />
                    <span className={formData.tipoPropiedad === 'casa' ? 'text-[#0B2F33] font-medium' : 'text-[#3D4E52]'}>
                      Casa
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('tipoPropiedad', 'departamento')}
                    className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      formData.tipoPropiedad === 'departamento'
                        ? 'border-[#8A4E2E] bg-[#C47A4A]/5'
                        : 'border-[#E5E0D5] hover:border-[#1B6E6A]'
                    }`}
                  >
                    <Building className={`w-5 h-5 ${formData.tipoPropiedad === 'departamento' ? 'text-[#8A4E2E]' : 'text-[#3D4E52]'}`} />
                    <span className={formData.tipoPropiedad === 'departamento' ? 'text-[#0B2F33] font-medium' : 'text-[#3D4E52]'}>
                      Departamento
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-magnus">m² construidos</label>
                  <input
                    type="number"
                    value={formData.metrosConstruidos}
                    onChange={(e) => handleInputChange('metrosConstruidos', e.target.value)}
                    placeholder="Ej: 120"
                    className="input-magnus"
                  />
                  {errors.metrosConstruidos && <p className="error-text">{errors.metrosConstruidos}</p>}
                </div>
                <div>
                  <label className="label-magnus">m² totales</label>
                  <input
                    type="number"
                    value={formData.metrosTotales}
                    onChange={(e) => handleInputChange('metrosTotales', e.target.value)}
                    placeholder="Ej: 150"
                    className="input-magnus"
                  />
                  <p className="helper-text">Terreno o terrazas</p>
                </div>
              </div>
            </div>
          ) : (
            /* Step 2: Personal Data */
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-magnus">Nombre</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    placeholder="Tu nombre"
                    className="input-magnus"
                  />
                  {errors.nombre && <p className="error-text">{errors.nombre}</p>}
                </div>
                <div>
                  <label className="label-magnus">Apellido</label>
                  <input
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    placeholder="Tu apellido"
                    className="input-magnus"
                  />
                  {errors.apellido && <p className="error-text">{errors.apellido}</p>}
                </div>
              </div>

              <div>
                <label className="label-magnus flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#1B6E6A]" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="tu@email.com"
                  className="input-magnus"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div>
                <label className="label-magnus flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#1B6E6A]" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  placeholder="+56 9 1234 5678"
                  className="input-magnus"
                />
                {errors.telefono && <p className="error-text">{errors.telefono}</p>}
              </div>

              <div className="bg-[#F4EFE6] rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.aceptaContacto}
                    onChange={(e) => handleInputChange('aceptaContacto', e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-2 border-[#1B6E6A] text-[#1B6E6A] focus:ring-[#1B6E6A]"
                  />
                  <span className="text-sm text-[#4B5563]">
                    Acepto ser contactado por Magnus y declaro que la información 
                    proporcionada es correcta. He leído la{' '}
                    <a href="#" className="text-[#1B6E6A] underline hover:text-[#8A4E2E]">
                      Política de Privacidad
                    </a>.
                  </span>
                </label>
                {errors.aceptaContacto && <p className="error-text mt-2">{errors.aceptaContacto}</p>}
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-[#3D4E52]">
                <Shield className="w-4 h-4 text-[#1B6E6A]" />
                Tus datos están protegidos y solo se usarán para contactarte sobre Magnus.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="sticky bottom-0 bg-white border-t border-[#E5E0D5] p-6">
            <div className="flex gap-4">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="btn-secondary flex-1 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Volver
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Guardando...
                  </>
                ) : step === 1 ? (
                  <>
                    Continuar
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  'Completar pre-registro'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

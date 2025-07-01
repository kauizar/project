import React, { useState } from 'react';
import { Phone, MapPin, Instagram, MessageCircle, User, Package, Calendar, CheckCircle, X, Plus, AlertTriangle, Wrench, Hammer, Drill, Menu, Eye, Trash2, Users, HardDrive as Screwdriver, Zap, Settings, Cog, Plane as Spanner } from 'lucide-react';

type Vendor = 'Felipe' | 'João' | 'Kauan' | 'Rodrigo' | 'Guilherme';

interface Delivery {
  id: string;
  clientName: string;
  clientPhone: string;
  product: string;
  observation?: string;
  address: string;
  deliveryDate: string;
  registrationDate: string;
  vendor: Vendor;
  status: 'pending' | 'completed' | 'cancelled';
}

interface MissingItem {
  id: string;
  item: string;
  vendor: Vendor;
  date: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'vendor-login' | 'vendor-area' | 'new-delivery' | 'missing-items' | 'about-us' | 'completed-deliveries'>('home');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [password, setPassword] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: '1',
      clientName: 'Maria Silva',
      clientPhone: '13 99999-9999',
      product: 'Cimento 50kg - 10 sacos',
      observation: 'Entregar até 18h',
      address: 'Rua das Flores, 123 - Centro',
      deliveryDate: '2025-01-20',
      registrationDate: '2025-01-15',
      vendor: 'Felipe',
      status: 'pending'
    },
    {
      id: '2',
      clientName: 'João Santos',
      clientPhone: '13 88888-8888',
      product: 'Tinta Suvinil 18L - Branca',
      address: 'Av. Brasil, 456 - Vila Nova',
      deliveryDate: '2025-01-21',
      registrationDate: '2025-01-16',
      vendor: 'João',
      status: 'completed'
    }
  ]);
  const [missingItems, setMissingItems] = useState<MissingItem[]>([
    {
      id: '1',
      item: 'Parafusos 6x40mm',
      vendor: 'Felipe',
      date: '2025-01-15'
    },
    {
      id: '2',
      item: 'Tinta Branca 18L',
      vendor: 'João',
      date: '2025-01-16'
    },
    {
      id: '3',
      item: 'Cimento Portland',
      vendor: 'Kauan',
      date: '2025-01-17'
    }
  ]);

  const [newDelivery, setNewDelivery] = useState({
    clientName: '',
    clientPhone: '',
    product: '',
    observation: '',
    address: '',
    deliveryDate: ''
  });

  const [newMissingItem, setNewMissingItem] = useState('');

  const brandLogos = [
    { name: 'Condor', logo: 'condorr.png', class: 'max-h-12 w-auto' },
    { name: 'Quartzolit', logo: '/new-logo-quartzolit_0.png', class: 'max-h-12 w-auto' },
    { name: 'Cauê', logo: '/site-caue-1668607058.jpg', class: 'max-h-14 w-auto' },
    { name: 'Suvinil', logo: '/logotipo-suvinil-fundo-laranja.png', class: 'max-h-12 w-auto' },
    { name: 'Lorenzetti', logo: '/lorenzetti copy.png', class: 'max-h-10 w-auto' }, 
    { name: 'Hydronorth', logo: '/hydronorth-logo.png', class: 'max-h-12 w-auto' } 
  ];

  const vendors: Vendor[] = ['Felipe', 'João', 'Kauan', 'Rodrigo', 'Guilherme'];

  const handleVendorLogin = (vendor: Vendor) => {
    if (password !== '2404') {
      alert('Senha incorreta!');
      return;
    }
    setSelectedVendor(vendor);
    setPassword('');
    setCurrentPage('vendor-area');
    setShowMenu(false);
  };

  const handleNewDelivery = () => {
    if (!selectedVendor) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    const delivery: Delivery = {
      id: Date.now().toString(),
      ...newDelivery,
      registrationDate: today,
      vendor: selectedVendor,
      status: 'pending'
    };
    
    setDeliveries([...deliveries, delivery]);
    setNewDelivery({
      clientName: '',
      clientPhone: '',
      product: '',
      observation: '',
      address: '',
      deliveryDate: ''
    });
    setCurrentPage('vendor-area');
  };

  const handleCancelDelivery = (id: string) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: 'cancelled' as const } : d
    ));
  };

  const handleCompleteDelivery = (id: string) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: 'completed' as const } : d
    ));
  };

  const handleDeleteCancelledDelivery = (id: string) => {
    setDeliveries(deliveries.filter(d => d.id !== id));
  };

  const handleAddMissingItem = () => {
    if (!selectedVendor || !newMissingItem.trim()) return;
    
    const item: MissingItem = {
      id: Date.now().toString(),
      item: newMissingItem,
      vendor: selectedVendor,
      date: new Date().toISOString().split('T')[0]
    };
    
    setMissingItems([...missingItems, item]);
    setNewMissingItem('');
  };

  const handleRemoveMissingItem = (id: string) => {
    setMissingItems(missingItems.filter(item => item.id !== id));
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/5513933034707', '_blank');
  };

  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative overflow-hidden">
        {/* Enhanced Floating Tools Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top Section Tools */}
          <Wrench className="absolute top-16 left-12 text-orange-400 opacity-25 transform rotate-45 animate-pulse" size={40} />
          <Hammer className="absolute top-24 right-20 text-orange-500 opacity-30 transform -rotate-12 animate-bounce" size={36} />
          <Drill className="absolute top-32 left-1/4 text-orange-400 opacity-25 transform rotate-12" size={44} />
          <Screwdriver className="absolute top-20 right-1/3 text-orange-500 opacity-20 transform rotate-30 animate-pulse" size={38} />
          <Spanner className="absolute top-40 left-1/3 text-orange-400 opacity-25 transform -rotate-45" size={42} />
          
          {/* Middle Section Tools */}
          <Wrench className="absolute top-1/2 left-16 text-orange-500 opacity-20 transform rotate-90 animate-bounce" size={36} />
          <Hammer className="absolute top-1/2 right-24 text-orange-400 opacity-25 transform rotate-135" size={40} />
          <Drill className="absolute top-60 left-1/2 text-orange-500 opacity-30 transform -rotate-30 animate-pulse" size={48} />
          <Settings className="absolute top-1/3 right-1/4 text-orange-400 opacity-20 transform rotate-45" size={34} />
          <Cog className="absolute top-2/3 left-1/4 text-orange-500 opacity-25 transform -rotate-60 animate-bounce" size={38} />
          <Zap className="absolute top-1/2 left-2/3 text-orange-400 opacity-20 transform rotate-15" size={32} />
          
          {/* Bottom Section Tools */}
          <Wrench className="absolute bottom-32 right-16 text-orange-500 opacity-25 transform -rotate-45 animate-pulse" size={44} />
          <Hammer className="absolute bottom-40 left-20 text-orange-400 opacity-20 transform rotate-75" size={38} />
          <Drill className="absolute bottom-24 right-1/3 text-orange-500 opacity-30 transform rotate-60 animate-bounce" size={42} />
          <Screwdriver className="absolute bottom-48 left-1/3 text-orange-400 opacity-25 transform -rotate-30" size={36} />
          <Spanner className="absolute bottom-36 right-1/4 text-orange-500 opacity-20 transform rotate-120 animate-pulse" size={40} />
          <Settings className="absolute bottom-20 left-1/2 text-orange-400 opacity-25 transform -rotate-45" size={34} />
          <Cog className="absolute bottom-56 right-12 text-orange-500 opacity-20 transform rotate-90 animate-bounce" size={36} />
          
          {/* Additional scattered tools */}
          <Wrench className="absolute top-80 left-3/4 text-orange-400 opacity-15 transform rotate-180" size={32} />
          <Hammer className="absolute bottom-64 left-1/4 text-orange-500 opacity-20 transform -rotate-90" size={34} />
          <Drill className="absolute top-96 right-1/2 text-orange-400 opacity-25 transform rotate-45 animate-pulse" size={38} />
          <Zap className="absolute bottom-80 right-1/3 text-orange-500 opacity-15 transform -rotate-15" size={30} />
        </div>

        {/* Menu Button */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            <Menu size={24} />
          </button>
          
          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute top-16 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 min-w-48 overflow-hidden">
              <button
                onClick={() => {
                  setCurrentPage('vendor-login');
                  setShowMenu(false);
                }}
                className="w-full px-6 py-4 text-left hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-3"
              >
                <User size={20} className="text-blue-600" />
                <span className="font-medium text-gray-800">Área do Vendedor</span>
              </button>
            </div>
          )}
        </div>

        {/* Header */}
        <header className="relative z-10 text-white text-center py-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight text-white drop-shadow-2xl">Casa Mais</h1>
          <p className="text-2xl md:text-3xl text-blue-100 drop-shadow-lg">Material de Construção</p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 md:px-6 pb-8 relative z-10">
          {/* Contact Info and Partner Brands */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border border-white/20">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
              {/* Contact Information Column */}
              <div className="space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">Informações de Contato</h2>
                
                <div className="flex items-center space-x-4 md:space-x-5 p-5 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-sm">
                  <MapPin className="text-blue-600 flex-shrink-0" size={32} />
                  <div>
                    <p className="font-bold text-gray-800 text-lg md:text-xl">Endereço</p>
                    <p className="text-gray-700 text-base md:text-lg">Av Nossa Senhora de Fátima, 554</p>
                    <p className="text-gray-700 text-base md:text-lg">Agenor de Campos, Mongaguá - SP</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 md:space-x-5 p-5 md:p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border border-orange-200 shadow-sm">
                  <Phone className="text-orange-600 flex-shrink-0" size={32} />
                  <div>
                    <p className="font-bold text-gray-800 text-lg md:text-xl">Telefone</p>
                    <p className="text-gray-700 text-lg md:text-xl">(13) 3303-4707</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 md:space-x-5 p-5 md:p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl border border-pink-200 shadow-sm">
                  <Instagram className="text-pink-600 flex-shrink-0" size={32} />
                  <div>
                    <p className="font-bold text-gray-800 text-lg md:text-xl">Instagram</p>
                    <p className="text-gray-700 text-lg md:text-xl">@casamaismongagua</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 md:p-8 rounded-3xl border-2 border-green-300 shadow-lg">
                  <p className="text-2xl md:text-3xl font-bold text-green-800 mb-3">Conheça nossos produtos!</p>
                  <p className="text-xl md:text-2xl font-semibold text-green-700 mb-6">Chame no nosso WhatsApp!</p>
                  
                  <button 
                    onClick={openWhatsApp}
                    className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl flex items-center justify-center space-x-3 md:space-x-4 transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    <MessageCircle size={28} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Partner Brands Column */}
              <div className="space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">Empresas Parceiras</h2>
                
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {brandLogos.map((brand, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 md:p-6 text-center hover:from-gray-100 hover:to-gray-200 transition-all duration-300 flex items-center justify-center h-20 md:h-24 shadow-md border border-gray-200">
                      {brand.logo ? (
                        <img 
                          src={brand.logo} 
                          alt={brand.name}
                          className={brand.class + " object-contain"}
                        />
                      ) : (
                        <p className={brand.class}>{brand.name}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quem somos nós button */}
                <div className="mt-6 md:mt-8">
                  <button
                    onClick={() => setCurrentPage('about-us')}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-5 md:p-6 rounded-2xl font-bold text-lg md:text-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-3"
                  >
                    <Users size={24} />
                    <span>Quem somos nós?</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'about-us') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Quem somos nós?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">Nossa História</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A Casa Mais é uma empresa familiar que atua há mais de 15 anos no mercado de materiais de construção em Mongaguá. 
                    Começamos como um pequeno negócio local e hoje somos referência na região.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Nossa Missão</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Fornecer materiais de construção de alta qualidade com atendimento personalizado, 
                    ajudando nossos clientes a realizar seus sonhos de construir e reformar.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <h3 className="text-2xl font-bold text-orange-800 mb-4">Nossos Valores</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Qualidade em primeiro lugar</li>
                    <li>• Atendimento personalizado</li>
                    <li>• Preços justos e competitivos</li>
                    <li>• Compromisso com a comunidade</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-3xl border-2 border-blue-300 shadow-lg">
                  <div className="w-48 h-48 mx-auto bg-gray-300 rounded-full mb-6 flex items-center justify-center">
                    <User size={80} className="text-gray-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Família Casa Mais</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Uma equipe dedicada e experiente, sempre pronta para atender você com carinho e profissionalismo. 
                    Nosso time de vendedores conhece cada produto e está preparado para te orientar na melhor escolha.
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentPage('home')}
              className="mt-8 text-gray-500 hover:text-gray-700 font-medium text-lg"
            >
              ← Voltar ao início
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'vendor-login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Área do Vendedor</h2>
            <p className="text-gray-600">Selecione seu nome e digite a senha</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Selecione o vendedor:</p>
              {vendors.map((vendor) => (
                <button
                  key={vendor}
                  onClick={() => handleVendorLogin(vendor)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-800 p-4 rounded-xl font-semibold transition-colors duration-200 border border-blue-200"
                >
                  {vendor}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setCurrentPage('home')}
            className="mt-8 w-full text-gray-500 hover:text-gray-700 font-medium text-lg"
          >
            ← Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'new-delivery') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Nova Entrega</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Cliente</label>
                <input
                  type="text"
                  value={newDelivery.clientName}
                  onChange={(e) => setNewDelivery({...newDelivery, clientName: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone do Cliente</label>
                <input
                  type="text"
                  value={newDelivery.clientPhone}
                  onChange={(e) => setNewDelivery({...newDelivery, clientPhone: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Produto do Cliente</label>
                <input
                  type="text"
                  value={newDelivery.product}
                  onChange={(e) => setNewDelivery({...newDelivery, product: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                <input
                  type="text"
                  value={newDelivery.address}
                  onChange={(e) => setNewDelivery({...newDelivery, address: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Entrega</label>
                <input
                  type="date"
                  value={newDelivery.deliveryDate}
                  onChange={(e) => setNewDelivery({...newDelivery, deliveryDate: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observação Adicional (opcional)</label>
                <textarea
                  value={newDelivery.observation}
                  onChange={(e) => setNewDelivery({...newDelivery, observation: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleNewDelivery}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-semibold transition-colors duration-200"
                >
                  Salvar Entrega
                </button>
                <button
                  onClick={() => setCurrentPage('vendor-area')}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-xl font-semibold transition-colors duration-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'missing-items') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Marcar o que está faltando</h2>
            <p className="text-gray-600 mb-8">Itens reportados por todos os vendedores</p>
            
            <div className="mb-8">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMissingItem}
                  onChange={(e) => setNewMissingItem(e.target.value)}
                  placeholder="Digite o item que está faltando..."
                  className="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddMissingItem}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {missingItems.map((item) => (
                <div key={item.id} className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">{item.item}</p>
                      <p className="text-sm text-gray-600">Marcado por: {item.vendor}</p>
                      <p className="text-sm text-gray-600">Data: {new Date(item.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="text-orange-600" size={24} />
                      <button
                        onClick={() => handleRemoveMissingItem(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                        title="Remover item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage('vendor-area')}
              className="mt-8 text-gray-500 hover:text-gray-700 font-medium text-lg"
            >
              ← Voltar para área do vendedor
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'completed-deliveries') {
    const vendorDeliveries = deliveries.filter(d => d.vendor === selectedVendor);
    const completedDeliveries = vendorDeliveries.filter(d => d.status === 'completed');

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Entregas Realizadas 2025 - {selectedVendor}</h2>
              <div className="text-2xl font-bold text-green-600">
                Total: {completedDeliveries.length}
              </div>
            </div>

            <div className="space-y-4">
              {completedDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{delivery.clientName}</h4>
                      <p className="text-gray-600">Telefone: {delivery.clientPhone}</p>
                      <p className="text-gray-600">Produto: {delivery.product}</p>
                      <p className="text-gray-600">Endereço: {delivery.address}</p>
                      <p className="text-gray-600">Data de Entrega: {new Date(delivery.deliveryDate).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-gray-500">Registrado em: {new Date(delivery.registrationDate).toLocaleDateString('pt-BR')}</p>
                      {delivery.observation && (
                        <p className="text-gray-600">Obs: {delivery.observation}</p>
                      )}
                    </div>
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage('vendor-area')}
              className="mt-8 text-gray-500 hover:text-gray-700 font-medium text-lg"
            >
              ← Voltar para área do vendedor
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vendor Area
  const vendorDeliveries = deliveries.filter(d => d.vendor === selectedVendor);
  const pendingDeliveries = vendorDeliveries.filter(d => d.status === 'pending');
  const completedDeliveries = vendorDeliveries.filter(d => d.status === 'completed');
  const cancelledDeliveries = vendorDeliveries.filter(d => d.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Área do Vendedor - {selectedVendor}</h2>
            <button 
              onClick={() => {
                setSelectedVendor(null);
                setCurrentPage('home');
              }}
              className="text-gray-500 hover:text-gray-700 font-medium text-lg"
            >
              Sair
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setCurrentPage('new-delivery')}
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-2xl font-semibold transition-colors duration-200"
            >
              <Plus className="mx-auto mb-2" size={24} />
              Nova Entrega
            </button>
            <button
              onClick={() => window.open('#', '_blank')}
              className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-2xl font-semibold transition-colors duration-200"
            >
              <MessageCircle className="mx-auto mb-2" size={24} />
              Perguntar para Pops
            </button>
            <button
              onClick={() => setCurrentPage('missing-items')}
              className="bg-orange-600 hover:bg-orange-700 text-white p-6 rounded-2xl font-semibold transition-colors duration-200"
            >
              <AlertTriangle className="mx-auto mb-2" size={24} />
              Marcar Faltando
            </button>
            <button
              onClick={() => setCurrentPage('vendor-login')}
              className="bg-gray-600 hover:bg-gray-700 text-white p-6 rounded-2xl font-semibold transition-colors duration-200"
            >
              <User className="mx-auto mb-2" size={24} />
              Trocar Vendedor
            </button>
          </div>

          {/* Pending Deliveries */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Entregas Pendentes ({pendingDeliveries.length})</h3>
              <button
                onClick={() => setCurrentPage('completed-deliveries')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <Eye size={20} />
                <span>Ver Realizadas ({completedDeliveries.length})</span>
              </button>
            </div>
            <div className="space-y-4">
              {pendingDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg">{delivery.clientName}</h4>
                      <p className="text-gray-600">Telefone: {delivery.clientPhone}</p>
                      <p className="text-gray-600">Produto: {delivery.product}</p>
                      <p className="text-gray-600">Endereço: {delivery.address}</p>
                      <p className="text-gray-600">Data de Entrega: {new Date(delivery.deliveryDate).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-gray-500">Registrado em: {new Date(delivery.registrationDate).toLocaleDateString('pt-BR')}</p>
                      {delivery.observation && (
                        <p className="text-gray-600">Obs: {delivery.observation}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCompleteDelivery(delivery.id)}
                        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => handleCancelDelivery(delivery.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cancelled Deliveries */}
          {cancelledDeliveries.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Entregas Canceladas ({cancelledDeliveries.length})</h3>
              <div className="space-y-4">
                {cancelledDeliveries.map((delivery) => (
                  <div key={delivery.id} className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">{delivery.clientName}</h4>
                        <p className="text-gray-600">Produto: {delivery.product}</p>
                        <p className="text-gray-600">Data de Entrega: {new Date(delivery.deliveryDate).toLocaleDateString('pt-BR')}</p>
                        <p className="text-sm text-gray-500">Registrado em: {new Date(delivery.registrationDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteCancelledDelivery(delivery.id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
                          title="Excluir entrega cancelada"
                        >
                          <Trash2 size={20} />
                        </button>
                        <X className="text-red-600" size={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
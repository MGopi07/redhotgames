import Image from "next/image";

export const metadata = {
  title: "Terminals | Red Hot Games",
  description: "Explore our premium range of betting terminals and gaming cabinets.",
};

const terminals = [
  {
    id: "Barcrest T7",
    name: "Barcrest T7",
    image: "/assets/img/terminals/go-4-gold.png",
    specs: [
      "Ardac Elite Note Acceptor​",
      "2 x 19” Monitors​",
      "Sr3 Coin Acceptor​",
      "Extremely Economical ​"
      
    ],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    image: "/assets/img/terminals/jupiter.png",
    specs: [
      "2 x 19\" Inch Screens",
      "Windows 7 Innocore PC",
      "Economical",
    ],
  },
  {
    id: "storm-cabinet",
    name: "Storm Cabinet",
    image: "/assets/img/terminals/storm-cabinet.png",
    specs: [
      "2 x 22\" Inch Screens",
      "SR5i Coin Acceptor",
      "Epic 430 Roll Ticket Printer",
      "Ardac Elite Note Acceptor",
    ],
  },
];

export default function TerminalPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfd] relative overflow-hidden flex flex-col pt-32 pb-24">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-brand-red/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-orange-500/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute inset-0 hero-grid opacity-50"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col">
        {/* Header */}
        <div className="text-center mb-16 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-brand-red text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            Hardware Solutions
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-zinc-900 mb-6 tracking-tight uppercase" style={{ fontFamily: 'var(--font-bebas)' }}>
            Premium <span className="text-brand-red">Terminals</span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-medium">
            Discover our industry-leading betting terminals and gaming cabinets, crafted for maximum engagement and uncompromised reliability.
          </p>
        </div>

        {/* Terminals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 justify-items-center">
          {terminals.map((terminal, idx) => (
            <div 
              key={terminal.id} 
              className="group w-full max-w-[420px] bg-white rounded-[32px] p-6 lg:p-8 flex flex-col items-center border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(227,30,36,0.08)] hover:border-brand-red/20"
            >
              {/* Image Container */}
              <div className="w-full h-[360px] lg:h-[400px] relative mb-8 bg-zinc-50/80 rounded-[24px] overflow-hidden group-hover:bg-red-50/50 transition-colors duration-500">
                <Image
                  src={terminal.image}
                  alt={terminal.name}
                  fill
                  className="object-contain p-6 drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              
              {/* Terminal Details */}
              <div className="flex-grow flex flex-col w-full">
                <h3 className="text-3xl lg:text-4xl font-black text-zinc-900 mb-6 text-center uppercase tracking-wide" style={{ fontFamily: 'var(--font-bebas)' }}>
                  {terminal.name}
                </h3>
                
                <ul className="space-y-3 w-full mb-8">
                  {terminal.specs.map((spec, index) => (
                    <li key={index} className="text-zinc-600 text-[15px] font-medium flex items-start gap-3">
                      <div className="mt-1 bg-brand-red/10 rounded-full p-0.5 text-brand-red">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="flex-1 leading-snug">{spec}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto w-full pt-4 border-t border-zinc-100">
                  <button className="w-full py-3.5 rounded-xl bg-zinc-50 text-zinc-900 font-bold text-sm tracking-wide uppercase hover:bg-brand-red hover:text-white transition-all duration-300 border border-zinc-200 hover:border-brand-red shadow-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

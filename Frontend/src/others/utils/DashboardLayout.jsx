import { SideBarPart } from '@/components/ui/SideBarPart';
import Particles from '@/components/ui/ReactBIt/Particles';

const DashboardLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-accent-foreground flex flex-col lg:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 xl:w-1/5  z-10">
        <SideBarPart />
      </div>

      {/* Content area */}
      <main className="flex-1 z-10 p-4">
        {children}
      </main>

      {/* Background Particles */}
      <div className="w-screen h-full absolute top-0 left-0 pointer-events-none z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;

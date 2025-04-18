import { SideBarPart } from '@/components/ui/SideBarPart';
import Particles from '@/components/ui/ReactBIt/Particles';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-accent-foreground relative min-h-screen overflow-hidden">
      {/* Sidebar with a fixed width */}
      <SideBarPart className="bg-secondary w-64" />

      {/* Content area */}
      <div className="flex-1 relative z-10">{children}</div>

      {/* Background particles */}
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

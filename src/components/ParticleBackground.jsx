import React, { useCallback, useContext, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { ThemeContext } from '../App';

const ParticleBackground = () => {
  const { theme } = useContext(ThemeContext);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: false, zIndex: 0 },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        resize: true,
      },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    particles: {
      color: { value: theme.particle },
      links: {
        color: '#1e293b',
        distance: 150,
        enable: true,
        opacity: 0.25,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: true,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: { enable: true, area: 900 },
        value: 55,
      },
      opacity: { value: 0.4 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [theme]);

  return (
    <div className="absolute inset-0 -z-0">
      <Particles
        key={theme.name}   /* key forces re-init when theme changes */
        id="tsparticles"
        init={particlesInit}
        options={options}
        className="h-full w-full absolute inset-0"
      />
    </div>
  );
};

export default ParticleBackground;

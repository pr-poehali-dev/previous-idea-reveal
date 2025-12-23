interface LogoProps {
  variant?: 'default' | 'memory' | 'logic' | 'attention' | 'creativity';
  size?: number;
}

const logoImages = {
  default: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/b1d69b59-edb2-464d-8aa9-93808394a54b.jpg',
  memory: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/ae8a9ff5-9213-474b-b6d5-434d506e547c.jpg',
  logic: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/3a1750f7-f160-4ab4-b3e4-11938209780f.jpg',
  attention: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/08af9b5d-0e28-4bb4-9345-d8f98d4bcef5.jpg',
  creativity: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/7e108214-e942-48d6-b6a8-011312dba5ed.jpg',
};

export default function Logo({ variant = 'default', size = 60 }: LogoProps) {
  return (
    <img 
      src={logoImages[variant]} 
      alt="Логотип" 
      className="object-contain transition-all duration-300 hover:scale-110"
      style={{ width: size, height: size }}
    />
  );
}

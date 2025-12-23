interface LogoProps {
  variant?: 'default' | 'memory' | 'logic' | 'attention' | 'creativity';
  size?: number;
}

const logoImages = {
  default: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/cbb13031-5606-4299-9bc4-442bdb7dbc5d.jpg',
  memory: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/52c0bcc1-22aa-42fe-a89f-c8b5f948b094.jpg',
  logic: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/0d0dc091-b7f8-4e72-9297-06fd85ca2722.jpg',
  attention: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/7e17544e-f958-45ee-8313-1613b7d6bea8.jpg',
  creativity: 'https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/208e4007-5093-4db2-b540-a9a22add58cf.jpg',
};

export default function Logo({ variant = 'default', size = 120 }: LogoProps) {
  return (
    <img 
      src={logoImages[variant]} 
      alt="Логотип" 
      className="object-contain transition-all duration-300 hover:scale-110"
      style={{ width: size, height: size }}
    />
  );
}
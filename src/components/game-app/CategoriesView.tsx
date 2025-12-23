import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { categories } from './types';

interface CategoriesViewProps {
  setSelectedCategory: (categoryId: string) => void;
}

export default function CategoriesView({ setSelectedCategory }: CategoriesViewProps) {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 text-primary">
          Выбери категорию
        </h2>
        <p className="text-xl text-muted-foreground">
          Развивай свои способности играючи! 🎮
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <Card 
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer border-4 group"
          >
            <CardHeader className={`${category.color}/10`}>
              <div className="flex items-center justify-center mb-4">
                <div className={`${category.color} p-6 rounded-full group-hover:animate-bounce-gentle`}>
                  <Icon 
                    name={category.icon} 
                    className="text-white" 
                    size={48} 
                  />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">{category.name}</CardTitle>
              <CardDescription className="text-center text-base">
                {category.games.length} увлекательных игр
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Button className="w-full" size="lg" variant="outline">
                Выбрать
                <Icon name="ArrowRight" className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

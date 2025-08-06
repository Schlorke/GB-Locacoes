import type { Meta, StoryObj } from '@storybook/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de card reutilizável com header, content, footer e outros subcomponentes. Baseado no ShadCN UI.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Classes CSS adicionais',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story básica do Card
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <p>Card footer</p>
      </CardFooter>
    </Card>
  ),
};

// Story com conteúdo rico
export const WithContent: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

// Story de produto
export const ProductCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
          <span className="text-muted-foreground">Product Image</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">Product Name</CardTitle>
        <CardDescription className="mt-2">
          This is a description of the product that explains its features and benefits.
        </CardDescription>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold">R$ 299,90</span>
          <Badge variant="secondary">In Stock</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

// Story de usuário
export const UserCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Passionate about creating amazing user experiences and building scalable applications.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Story de estatísticas
export const StatsCard: Story = {
  render: () => (
    <Card className="w-[200px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">R$ 45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  ),
};

// Story de notificação
export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">New Message</CardTitle>
          <Badge variant="destructive">New</Badge>
        </div>
        <CardDescription>You have a new message from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          "Hey! Just wanted to let you know that the new feature has been deployed successfully.
          Please test it when you have a chance."
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Mark as Read
        </Button>
        <Button size="sm">Reply</Button>
      </CardFooter>
    </Card>
  ),
};

// Story de formulário
export const FormCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  ),
};

// Story de lista
export const ListCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent activities and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Project updated</p>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">New comment</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Task assigned</p>
            <p className="text-xs text-muted-foreground">3 hours ago</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Story de demonstração de todos os subcomponentes
export const AllComponents: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Card with Header</CardTitle>
          <CardDescription>This card has a header with title and description</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          <CardTitle>Card with Content</CardTitle>
          <p>This card only has content area</p>
        </CardContent>
      </Card>

      <Card>
        <CardFooter>
          <CardTitle>Card with Footer</CardTitle>
          <p>This card only has footer area</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>This card has all sections</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content area with some text</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstração de diferentes combinações dos subcomponentes do Card.',
      },
    },
  },
};

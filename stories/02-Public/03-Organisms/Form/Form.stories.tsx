import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const meta: Meta = {
  title: 'Public/Organisms/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sistema completo de formulários com React Hook Form e Zod. Validação automática, mensagens de erro, e acessibilidade integrada.',
      },
    },
  },
}

export default meta
type Story = StoryObj

// Simple Login Form
export const LoginForm: Story = {
  args: {},
  render: function LoginFormRender() {
    const formSchema = z.object({
      email: z.string().email('Email inválido'),
      password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Form>
    )
  },
}

// Contact Form
export const ContactForm: Story = {
  args: {},
  render: function ContactFormRender() {
    const formSchema = z.object({
      name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
      email: z.string().email('Email inválido'),
      phone: z.string().optional(),
      message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(console.log)}
          className="w-96 space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormDescription>Seu email para contato</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone (opcional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    )
  },
}

// With Checkbox
export const FormWithCheckbox: Story = {
  args: {},
  render: function FormWithCheckboxRender() {
    const formSchema = z.object({
      terms: z.boolean().refine((val) => val === true, {
        message: 'Você deve aceitar os termos',
      }),
      newsletter: z.boolean().default(false),
    })

    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema) as any,
      defaultValues: {
        terms: false,
        newsletter: false,
      },
    })

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(console.log)}
          className="w-96 space-y-4"
        >
          <FormField
            control={form.control as any}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Aceito os termos e condições</FormLabel>
                  <FormDescription>
                    Você concorda com nossos Termos de Serviço e Política de
                    Privacidade.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control as any}
            name="newsletter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Assinar newsletter</FormLabel>
                  <FormDescription>
                    Receber atualizações sobre novos produtos.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>
      </Form>
    )
  },
}

// Validation Example
export const ValidationForm: Story = {
  args: {},
  render: function ValidationFormRender() {
    const formSchema = z.object({
      username: z
        .string()
        .min(3, 'Mínimo 3 caracteres')
        .max(20, 'Máximo 20 caracteres')
        .regex(/^[a-z0-9_]+$/, 'Apenas letras minúsculas, números e _'),
      email: z.string().email('Email inválido'),
      age: z.coerce
        .number()
        .min(18, 'Deve ter no mínimo 18 anos')
        .max(120, 'Idade inválida'),
    })

    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema) as any,
      mode: 'onChange',
      defaultValues: {
        username: '',
        email: '',
        age: 18,
      },
    })

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(console.log)}
          className="w-96 space-y-4"
        >
          <FormField
            control={form.control as any}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input placeholder="usuario123" {...field} />
                </FormControl>
                <FormDescription>
                  Apenas letras minúsculas, números e underscore
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as any}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="usuario@exemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as any}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="18" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Validar
          </Button>
        </form>
      </Form>
    )
  },
}

// Complete Registration Form
export const RegistrationForm: Story = {
  args: {},
  render: function RegistrationFormRender() {
    const formSchema = z
      .object({
        name: z.string().min(2, 'Nome é obrigatório'),
        email: z.string().email('Email inválido'),
        password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
        confirmPassword: z.string(),
        terms: z.boolean().refine((val) => val === true, {
          message: 'Você deve aceitar os termos',
        }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: 'Senhas não coincidem',
        path: ['confirmPassword'],
      })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(console.log)}
          className="w-96 space-y-4 p-6 bg-white rounded-xl shadow-md"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Criar Conta</h2>
            <p className="text-sm text-gray-600">Preencha seus dados</p>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="joao@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>Mínimo 8 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Aceito os termos e condições</FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Criar Conta
          </Button>
        </form>
      </Form>
    )
  },
}

// Default Story (simples para playground)
export const Default: Story = {
  args: {},
  render: function DefaultRender() {
    const formSchema = z.object({
      name: z.string().min(1, 'Nome é obrigatório'),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(console.log)}
          className="w-96 space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    )
  },
}

// Playground
export const Playground: Story = {
  args: {},
  render: Default.render,
}

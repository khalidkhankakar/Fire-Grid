import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
export default function Home() {
  return (
    <div className="h-screen relative ">
      {/* Navigation */}
      <header className='relative bg-gray-300'>
        <nav className="bg-gray-200 fixed top-0 w-full px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Trello"
              width={100}
              height={30}
              className="h-8 w-auto "
            />
          </Link>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </nav>
      </header>
      {/* Hero Section */}
      <div className="flex p-12 md:p-16 pt-20    ">
        <div className="relative flex flex-col md:flex-row items-center justify-center  h-full w-full">

          {/* Content */}
          <div className="max-w-4xl space-y-3 z-10 ">
            <Image
              src="/logo.svg"
              alt="Trello"
              width={100}
              height={30}
              className="h-16 md:h-20  w-auto "
            />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0B3B77] leading-tight">
              Trello es la manera gratuita, flexible y visual de organizarlo todo con cualquiera.
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl">
              Deje a un lado las largas cadenas de correos electrónicos, las hojas de cálculo sin actualizar, las notas rápidas ya no tan adhesivas y el software inadecuado para gestionar sus proyectos.
            </p>
            <Button size="lg" className="bg-[#0065FF] hover:bg-[#0747A6] text-white px-8">
              ¡Regístrate gratis!
            </Button>
          </div>

          {/* Decorative Images */}

          <div className=''>
            <div className="">
              <Image
                src="/assets/hero.svg"
                alt="Decorative left"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


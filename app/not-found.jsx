import Link from 'next/link'

export default function NotFound() {
  return (
    <main className=" flex flex-col items-center bg-slate-100">
      <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 className='text-xs'>404 - Page Not Found</h1>
      <p className="text-4xl font-bold text-blue-900 my-2">Sorry, Ulinzi Fans!</p>
      <p>We can't seem to find the page you're after.</p>
      </div>
      <div className=" bg-white w-full mx-auto">
        <h2 className='text-base font-bold'>Useful Links</h2>
        <Link href="/">Ulinzi Football Hub Home</Link>
      </div>
    </main>
  );
}

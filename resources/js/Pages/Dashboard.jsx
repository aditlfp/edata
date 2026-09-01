import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BiArrowToRight, BiCalendar, BiCheckCircle, BiGridAlt } from 'react-icons/bi';

export default function Dashboard({ auth }) {
    const name = auth?.user?.nama_lengkap || auth?.user?.name || 'Pengguna';
    const today = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date());

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-bold tracking-tight text-slate-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 to-orange-500 p-6 text-white shadow-lg sm:p-8">
                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-2 text-sm font-medium text-orange-100">Selamat datang kembali</p>
                            <h1 className="text-2xl font-black sm:text-3xl">{name}</h1>
                            <p className="mt-2 text-sm text-orange-100">Pantau aktivitas E-DATA dari satu tempat.</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-orange-100"><BiCalendar className="text-lg" />{today}</div>
                    </div>
                </section>
                <section className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                        [BiGridAlt, 'Panel admin', 'Kelola data operasional'],
                        [BiCheckCircle, 'Status sistem', 'Berjalan normal'],
                        [BiArrowToRight, 'Akses cepat', 'Gunakan menu navigasi'],
                    ].map(([Icon, title, text]) => (
                        <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <Icon className="mb-4 rounded-lg bg-orange-100 p-2 text-4xl text-orange-600" />
                            <h2 className="font-bold text-slate-800">{title}</h2>
                            <p className="mt-1 text-sm text-slate-500">{text}</p>
                        </article>
                    ))}
                </section>
            </main>
        </AuthenticatedLayout>
    );
}

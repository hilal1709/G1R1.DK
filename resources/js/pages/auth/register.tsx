import { FormEventHandler, useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, [reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                {/* Back to Home Button */}
                <Link
                    href="/"
                    className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors z-50"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Kembali</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full max-w-md z-10"
                >
                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <motion.div
                                className="flex items-center justify-center gap-3 mb-3"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-xl">DK</span>
                                </div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                                    Damar Kurung
                                </h1>
                            </motion.div>
                        </Link>
                        <p className="text-gray-600 text-sm">Buat akun baru untuk memulai perjalanan Anda</p>
                    </div>

                    {/* Register Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50"
                    >
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                            <div className="p-2.5 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl shadow-lg">
                                <UserPlus className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Daftar</h2>
                                <p className="text-sm text-gray-500">Buat akun baru</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Lengkap
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className={`block w-full pl-11 pr-4 py-3.5 border ${
                                            errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                                        } rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
                                        autoComplete="name"
                                        placeholder="Nama lengkap Anda"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoFocus
                                    />
                                </div>
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                                    >
                                        <span className="font-medium">⚠</span> {errors.name}
                                    </motion.p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Alamat Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className={`block w-full pl-11 pr-4 py-3.5 border ${
                                            errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                                        } rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
                                        autoComplete="username"
                                        placeholder="contoh@email.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                                    >
                                        <span className="font-medium">⚠</span> {errors.email}
                                    </motion.p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className={`block w-full pl-11 pr-12 py-3.5 border ${
                                            errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                                        } rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
                                        autoComplete="new-password"
                                        placeholder="Minimal 8 karakter"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                                    >
                                        <span className="font-medium">⚠</span> {errors.password}
                                    </motion.p>
                                )}
                            </div>

                            {/* Password Confirmation Input */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Konfirmasi Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password_confirmation"
                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className={`block w-full pl-11 pr-12 py-3.5 border ${
                                            errors.password_confirmation ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-orange-500 focus:border-orange-500'
                                        } rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
                                        autoComplete="new-password"
                                        placeholder="Ulangi password Anda"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                    >
                                        {showPasswordConfirmation ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                        )}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                                    >
                                        <span className="font-medium">⚠</span> {errors.password_confirmation}
                                    </motion.p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5" />
                                        <span>Daftar Sekarang</span>
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-600">
                                Sudah punya akun?{' '}
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                                >
                                    Login di sini
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </>
    );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Loader, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { customerRegister } from '../services/shopifyService';
import Logo from '../assets/Logo.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!firstName || !lastName || !email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            await customerRegister(email, password, firstName, lastName);
            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>

            <div className="max-w-md w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-6">
                        <div className="relative">
                            <LazyLoadImage
                                loading='lazy'
                                src={Logo}
                                className="w-20 h-20 transform hover:scale-110 transition-transform duration-300"
                                alt="Desert Safaris UAE"
                            />
                            <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur opacity-25"></div>
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-4 border border-amber-200">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-amber-700 text-sm font-bold uppercase tracking-wider">Join Us</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-3">Create Your Account</h1>
                    <p className="text-gray-600 text-lg font-medium">Start your desert adventure journey today</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-amber-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error or Success */}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-semibold">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                {success}
                            </div>
                        )}

                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-2">
                                First Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-amber-500" />
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all font-medium"
                                    placeholder="John"
                                    required
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-2">
                                Last Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-amber-500" />
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all font-medium"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-amber-500" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all font-medium"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-amber-500" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all font-medium"
                                    placeholder="Create a strong password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-amber-500 hover:text-amber-600" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-amber-500 hover:text-amber-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Benefits Box */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                            <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-600" />
                                Member Benefits
                            </h3>
                            <ul className="space-y-2 text-xs text-gray-700 font-medium">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                    Track your bookings easily
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                    Exclusive member discounts
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                    Faster checkout process
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                    Priority customer support
                                </li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-amber-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-600 font-bold">or</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-gray-700 font-medium">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-amber-600 hover:text-amber-700 font-black"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-gray-900 text-sm font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="font-semibold">Secure Registration</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
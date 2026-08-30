import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

export default function TermsOfService() {
    const { t, dir } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Simulate loading for professional feel
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const sections = (t('termsOfService.sections') as Array<{ title: string; content: string }>) || [];

    // Staggered animation variants
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse" />
                        <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
                    </div>
                    <span className="text-muted-foreground text-sm font-medium tracking-widest uppercase animate-pulse">
                        {t('brandName')}
                    </span>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-background text-foreground py-12 px-6"
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="mb-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={item}>
                        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-medium group transition-colors">
                            {dir === 'ltr' ?
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> :
                                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                            }
                            {t('termsOfService.backToHome')}
                        </Link>
                    </motion.div>

                    <motion.h1 variants={item} className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        {t('termsOfService.title')}
                    </motion.h1>
                    <motion.p variants={item} className="text-muted-foreground">
                        {t('termsOfService.lastUpdated')}
                    </motion.p>
                </motion.div>

                <motion.div
                    className="bg-card rounded-2xl p-8 border border-border shadow-sm"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <div className="space-y-8">
                        {sections && sections.map((section, index) => (
                            <motion.section key={index} variants={item}>
                                <h2 className="text-xl font-bold mb-3 text-foreground">{section.title}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {section.content}
                                </p>
                            </motion.section>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

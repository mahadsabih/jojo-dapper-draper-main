import { useParams, Navigate } from "react-router-dom";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getContentPageBySlug } from "@/lib/adminData";
import ReactMarkdown from "react-markdown";

interface DynamicPageProps {
    slug?: string;
}

const DynamicPage = ({ slug: propSlug }: DynamicPageProps) => {
    const { slug: paramSlug } = useParams<{ slug: string }>();
    const slug = propSlug || paramSlug;

    const page = getContentPageBySlug(slug || "");

    if (!page) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <AnnouncementBar />
            <Header />

            <main className="flex-1">
                <div className="container py-12 lg:py-16 max-w-3xl">
                    <h1 className="font-display text-4xl lg:text-5xl font-semibold mb-8">
                        {page.title}
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <ReactMarkdown>{page.content}</ReactMarkdown>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DynamicPage;

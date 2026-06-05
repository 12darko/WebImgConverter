import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { SiteShell, DocsSidebar, DocsSidebarGroup } from '../components/layout';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface CodeTab {
    id: string;
    label: string;
    lang: string;
    code: string;
}

const AUTH_TABS: CodeTab[] = [
    {
        id: 'curl',
        label: 'cURL',
        lang: 'bash',
        code: `curl https://api.WebImgConverter.com/v1/user \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    },
    {
        id: 'python',
        label: 'Python',
        lang: 'python',
        code: `import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
r = requests.get("https://api.WebImgConverter.com/v1/user", headers=headers)
print(r.json())`,
    },
    {
        id: 'node',
        label: 'Node.js',
        lang: 'javascript',
        code: `const res = await fetch("https://api.WebImgConverter.com/v1/user", {
  headers: { Authorization: "Bearer YOUR_API_KEY" }
});
console.log(await res.json());`,
    },
];

const CONVERT_TABS: CodeTab[] = [
    {
        id: 'curl',
        label: 'cURL',
        lang: 'bash',
        code: `curl -X POST https://api.WebImgConverter.com/v1/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://example.com/photo.jpg",
    "target_format": "webp",
    "quality": 80
  }'`,
    },
];

const RESPONSE_JSON = `{
  "success": true,
  "data": {
    "id": "req_8f7d8a25",
    "url": "https://cdn.WebImgConverter.com/out/8f7d8a25.webp",
    "original_size_bytes": 1048576,
    "new_size_bytes": 245760,
    "savings_percent": 76.5
  }
}`;

const SIDEBAR_GROUPS: DocsSidebarGroup[] = [
    {
        title: 'Getting Started',
        items: [
            { id: 'introduction', label: 'Introduction' },
            { id: 'authentication', label: 'Authentication' },
            { id: 'errors', label: 'Errors' },
            { id: 'rate-limits', label: 'Rate Limits' },
        ],
    },
    {
        title: 'Image Processing',
        items: [
            { id: 'optimize', label: '/optimize' },
            { id: 'convert', label: '/convert' },
            { id: 'resize', label: '/resize' },
        ],
    },
    {
        title: 'Webhooks',
        items: [
            { id: 'events', label: 'Events' },
            { id: 'signatures', label: 'Signatures' },
        ],
    },
];

const CodePanel: React.FC<{ title: string; tabs: CodeTab[] }> = ({ title, tabs }) => {
    const [active, setActive] = React.useState(tabs[0].id);
    const tab = tabs.find((t) => t.id === active) || tabs[0];

    return (
        <div className="bg-ink-900 rounded-2xl overflow-hidden">
            <div className="px-4 pt-4 pb-2">
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">{title}</div>
                <div className="flex items-center gap-1">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setActive(t.id)}
                            className={[
                                'h-7 px-2.5 text-[11px] font-semibold rounded-md transition-colors',
                                active === t.id
                                    ? 'bg-slate-800 text-white'
                                    : 'text-slate-500 hover:text-slate-300',
                            ].join(' ')}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>
            <pre className="px-4 pb-4 pt-2 text-[12px] leading-relaxed font-mono text-slate-200 whitespace-pre-wrap break-all overflow-x-auto">
                {tab.code}
            </pre>
        </div>
    );
};

export default function ApiDocsPage() {
    const navigate = useNavigate();
    const [activeId, setActiveId] = React.useState('authentication');

    return (
        <SiteShell onCta={() => navigate('/')} ctaLabel="Get Started" bg="white">
            <Helmet>
                <title>API Documentation h WebImgConverter</title>
                <meta name="description" content="WebImgConverter API reference: authentication, /convert, /optimize, /resize endpoints, rate limits, webhooks." />
                <link rel="canonical" href="https://webimgconverter.com/api" />
            </Helmet>

            <section className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_360px] gap-8 lg:gap-10">
                    {/* Sidebar */}
                    <DocsSidebar
                        groups={SIDEBAR_GROUPS}
                        activeId={activeId}
                        onChange={setActiveId}
                        headerSlot={
                            <Button variant="primary" fullWidth size="md" leftIcon={
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                                </svg>
                            }>
                                Developer Dashboard
                            </Button>
                        }
                    />

                    {/* Main content */}
                    <div className="min-w-0 max-w-none">
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-5">
                            Authentication
                        </h1>
                        <p className="text-base text-slate-600 leading-relaxed mb-5">
                            The WebImgConverter API uses API keys to authenticate requests. You can view and manage your API keys in the{' '}
                            <a href="#" className="text-brand-600 font-semibold hover:underline">Developer Dashboard</a>.
                        </p>

                        {/* Warning callout */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-8 flex gap-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 mt-0.5 shrink-0">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                            <p className="text-[13px] text-yellow-900 leading-relaxed">
                                Your API keys carry many privileges, so be sure to keep them secret! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
                            </p>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed mb-10">
                            Authentication to the API is performed via HTTP Bearer Auth. Provide your API key as the bearer token value.
                        </p>

                        {/* /convert endpoint */}
                        <div className="mb-8 flex items-center gap-3">
                            <Badge tone="brand">POST</Badge>
                            <code className="font-mono text-lg font-bold text-slate-900">/convert</code>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                            Converts an image from one format to another (e.g., JPG to WebP). Maintains quality while reducing file size if applicable.
                        </p>

                        {/* Parameters table */}
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">Parameters</h2>
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-10">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-700">Name</th>
                                        <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-700">Type</th>
                                        <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-700">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex items-center gap-2">
                                                <code className="font-mono text-xs text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded">image_url</code>
                                                <span className="text-[10px] font-bold text-rose-600 uppercase">Required</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-600 align-top">string</td>
                                        <td className="px-4 py-3 text-xs text-slate-600 align-top leading-relaxed">
                                            The public URL of the image you wish to convert. Must be accessible by our servers.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex items-center gap-2">
                                                <code className="font-mono text-xs text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded">target_format</code>
                                                <span className="text-[10px] font-bold text-rose-600 uppercase">Required</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-600 align-top">string</td>
                                        <td className="px-4 py-3 text-xs text-slate-600 align-top leading-relaxed">
                                            The format to convert to. Options: <code className="font-mono text-[11px] bg-slate-100 px-1 rounded">webp</code>, <code className="font-mono text-[11px] bg-slate-100 px-1 rounded">png</code>, <code className="font-mono text-[11px] bg-slate-100 px-1 rounded">jpg</code>, <code className="font-mono text-[11px] bg-slate-100 px-1 rounded">avif</code>.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 align-top">
                                            <code className="font-mono text-xs text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">quality</code>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-600 align-top">integer</td>
                                        <td className="px-4 py-3 text-xs text-slate-600 align-top leading-relaxed">
                                            Compression quality from 1 to 100. Default is 85. Lower values mean smaller files but lower visual quality.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Status codes */}
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">Status Codes</h2>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            WebImgConverter uses conventional HTTP response codes to indicate the success or failure of an API request.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                            {[
                                { code: '200', label: 'OK', desc: 'Everything worked as expected.', color: 'bg-brand-500' },
                                { code: '400', label: 'Bad Request', desc: 'The request was unacceptable, often due to a missing required parameter.', color: 'bg-rose-500' },
                                { code: '401', label: 'Unauthorized', desc: 'No valid API key provided.', color: 'bg-yellow-500' },
                                { code: '429', label: 'Too Many Requests', desc: 'Too many requests hit the API too quickly. Check rate limits.', color: 'bg-orange-500' },
                            ].map((s) => (
                                <div key={s.code} className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-3">
                                    <div className={`w-2 h-2 rounded-full ${s.color} mt-2 shrink-0`} />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-mono text-xs font-bold text-slate-900">{s.code}</span>
                                            <span className="text-[11px] text-slate-500">h {s.label}</span>
                                        </div>
                                        <div className="text-[12px] text-slate-500 leading-relaxed">{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: code panels (sticky) */}
                    <div className="space-y-4">
                        <div className="lg:sticky lg:top-24 space-y-4">
                            <CodePanel title="Example Request: Auth" tabs={AUTH_TABS} />
                            <CodePanel title="Example Request: /convert" tabs={CONVERT_TABS} />

                            <div className="bg-ink-900 rounded-2xl overflow-hidden">
                                <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Response</div>
                                    <span className="font-mono text-[11px] text-brand-400">200 OK</span>
                                </div>
                                <pre className="px-4 pb-4 pt-2 text-[12px] leading-relaxed font-mono text-slate-200 whitespace-pre-wrap overflow-x-auto">
                                    {RESPONSE_JSON}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}

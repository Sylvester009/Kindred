export default async function Network({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return (
        <section className="bg-background text-on-background antialiased min-h-screen flex flex-col">
            <header className="bg-surface shadow-sm docked full-width top-0 z-50">
                <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max-width mx-auto">
                    <div className="flex items-center gap-6">
                        <a className="font-headline-md text-headline-md font-bold text-primary" href="/">Kindred</a>

                    </div>

                    <div className="flex items-center gap-4">

                        <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
                            <img alt="Samuel Sylvester profile picture" className="w-full h-full object-cover" data-alt="A small, professional headshot of a corporate worker in modern lighting with high contrast and a neutral background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeKNSvflWPuNxOyQk9BrxoaOI7z7qYKRtklM9yc6-qc2GjMQ0xKtpc52xtjfneEfbea1--Clynn27XxYLI5QsbDiJwds3_phKCRiKYfvffT-VejONudbTHrHdlA16PKI2UuvYLIoHTJ3gh4LVXSd1J_Guw19N05oskRjTI7WLbv7i06yVev6nQoAB1kcWVr1KUES3QQisINaMjiKYDusPmmxxEl3ISFTLi95D-pzAIflaK85FQ8Q7o" />
                        </div>
                    </div>
                </div>
            </header>
            <main className="grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
                <aside className="md:col-span-3 flex flex-col gap-stack-lg h-fit sticky top-24">
                    <div className="bg-surface-lowest border border-outline-variant rounded-lg p-stack-lg shadow-[0px_4px_20px_rgba(30,41,59,0.05)]">
                        <h2 className="font-headline-md text-headline-md text-primary">
                            Find Connections
                        </h2>
                        <div className="mb-8">
                            <label className="block font-label-md text-label-md text-on-surface-variant my-4">Search network</label>
                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                                        search
                                    </span>

                                    <input
                                        id="network-search"
                                        type="search"
                                        placeholder="Name, role or company..."
                                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-body-md outline-none transition-all placeholder:text-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>

                            <label className="block font-label-md text-label-md text-on-surface-variant mb-4">
                                Filter by
                            </label>

                            <div className="space-y-3">
                                {/* Role */}
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between py-2 text-left group"
                                >
                                    <span className="flex items-center gap-3 text-on-surface group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[19px] text-outline-variant">
                                            work
                                        </span>

                                        <span className="font-body-md text-body-md">
                                            Role
                                        </span>
                                    </span>

                                    <span className="material-symbols-outlined text-outline-variant text-[18px]">
                                        chevron_right
                                    </span>
                                </button>

                                {/* Skills */}
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between py-2 text-left group"
                                >
                                    <span className="flex items-center gap-3 text-on-surface group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[19px] text-outline-variant">
                                            psychology
                                        </span>

                                        <span className="font-body-md text-body-md">
                                            Skills
                                        </span>
                                    </span>

                                    <span className="material-symbols-outlined text-outline-variant text-[18px]">
                                        chevron_right
                                    </span>
                                </button>

                                {/* Company */}
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between py-2 text-left group"
                                >
                                    <span className="flex items-center gap-3 text-on-surface group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[19px] text-outline-variant">
                                            corporate_fare
                                        </span>

                                        <span className="font-body-md text-body-md">
                                            Organization
                                        </span>
                                    </span>

                                    <span className="material-symbols-outlined text-outline-variant text-[18px]">
                                        chevron_right
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>
                </aside>
                <section className="md:col-span-9 flex flex-col gap-stack-lg">
                    <div className="flex justify-between items-end mb-2 border-b border-outline-variant pb-4">
                        <div>
                            <h1 className="font-headline-lg text-headline-lg text-primary">Discovery Match</h1>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Found via extended engineering network.</p>
                        </div>
                        <button className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-2 rounded font-label-md text-label-md hover:bg-tertiary-fixed-dim transition-colors flex items-center gap-2 shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">add_link</span> Connect
                        </button>
                    </div>
                    <div className="bg-surface border border-outline-variant rounded-lg p-stack-lg shadow-[0px_4px_20px_rgba(30,41,59,0.05)] hover:shadow-[0px_8px_30px_rgba(30,41,59,0.08)] transition-shadow">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-32 h-32 rounded-lg overflow-hidden border border-outline-variant shrink-0 relative">
                                <img className="w-full h-full object-cover" data-alt="A high-quality professional portrait of a female frontend engineer in a modern office space. Soft, high-key lighting creates a bright, optimistic mood. The aesthetic is clean, sharp, and corporate." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY2SSf4DtMaKrXAT7HPIXAHfAzsWKfKdxNfMVj1rDrIkcDPpEmQpJwdPAKWbd1ALRWSJnnBZhTX798KhaOMD2ybCAvMP1r8p14uHiYe-oXefUirHMEbC9xvuL3CP4zQUX2-mPB4hsnnx5FlxaKe5MGPX9AwtBA1nEWIupOtf_9qPX9PnSs-V_azFEnqnmliQEelLcZ9A10_fqz6HzExp5M1nXxBRtvDeWpMzzWoYV-8zsn6c8Pms6K" />
                                <div className="absolute bottom-2 right-2 bg-secondary text-on-secondary text-xs font-bold px-2 py-1 rounded">3RD</div>
                            </div>
                            <div className="grow">
                                <h2 className="font-headline-md text-headline-md text-primary">Sarah Jenkins</h2>
                                <p className="font-body-lg text-body-lg text-secondary mb-4">Senior Frontend Engineer @ TechFlow</p>
                                <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-2xl">Specializes in large-scale React applications and design system architecture. Recently led the frontend migration for TechFlow's enterprise dashboard, improving render performance by 40%.</p>
                                <div className="mt-6 pt-6 border-t border-outline-variant">
                                    <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase">Connection Path</h3>
                                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                        <div className="flex flex-col items-center gap-1 min-w-15">
                                            <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden">
                                                <img className="w-full h-full object-cover" data-alt="Small avatar icon of a professional man." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu5ini9Q2p0wO8BrttzkC4jhEzJTsWma4axrsbeDygTsIwT2pJTUaN7TpBJFMaJPHNaVENnWsqyhT6lsMhvbJwnFkMs-AMJ18SYihDWPHWFdZnUSIs_p4uhj759RSckzmrYSSG2ICTGGj6ppOX6OO9cJLxunyGroAS2R4AEhsrwXpsckfIlWHR_4SfnuwfvbVUi2Kyp17n1dJkFI-sIi4eoEybzZrpv5G9Wro2_UNBN8bN6qfiQj1N" />
                                            </div>
                                            <span className="font-label-sm text-label-sm text-primary">You</span>
                                        </div>
                                        <div className="grow h-px bg-outline-variant min-w-10 relative">
                                            <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-outline-variant text-[16px] bg-surface px-1">arrow_forward</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 min-w-15">
                                            <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden">
                                                <img className="w-full h-full object-cover" data-alt="Small avatar icon of a male software engineer." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3txpRbxxmM575n9fs-UEzrhWXk3mTdURgd13ymilt-NxO6bC2hTaCnfi-zDqZLOss0PDn5NP4O14dRB-q7dN4XH5nBGvv1h778UPLy36SBWxIGb3UpLml1zkxBeIUKrXrEqlLf_sQQvf-94sBvYgpVLTDLnOEb3Rn8qORE9ag3jmucqqilF84zD3nwGsSBimruIb6LfJXGhULUmrIFqFlF2kteHXcoJm5_8y54bDZl9SYD3Sde4ME" />
                                            </div>
                                            <span className="font-label-sm text-label-sm text-primary">Daniel</span>
                                        </div>
                                        <div className="grow h-px bg-outline-variant min-w-10 relative">
                                            <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-outline-variant text-[16px] bg-surface px-1">arrow_forward</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 min-w-15">
                                            <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden">
                                                <img className="w-full h-full object-cover" data-alt="Small avatar icon of a male product manager." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2wPIxdagsy4kouWDH2x_pEdttWS25ZmeQwGefLz6RNC2c73m-kjOXwAB-WMa5hGxzf4NpCKxfc-qMpGRtoRXI2UWkVxSwhqoa3RvmEh27UxZMu2kZcSZMJzhfhykFgYjXjg_KfDIRzq06rQh6lL0OorA790LPj9pnCAtn9eRoFwLJwt8VkDGFLGY1kUZj_B2Y7xA1bez1Fi0tEtkbtuv29XXBKU8pRkT89jSQl83R_Lmohwak4MRw" />
                                            </div>
                                            <span className="font-label-sm text-label-sm text-primary">Chinedu</span>
                                        </div>
                                        <div className="grow h-0.5 bg-secondary min-w-10 relative">
                                            <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-secondary text-[16px] bg-surface px-1">arrow_forward</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 min-w-15">
                                            <div className="w-10 h-10 rounded-lg bg-surface border-2 border-secondary overflow-hidden">
                                                <img className="w-full h-full object-cover" data-alt="Small avatar icon of a female frontend engineer." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxqChoT2UyiJLwAvASLaJvkSl_zFZucJrNvhHdFQwUShCmbWPXaUdFf4lGuFK1OiXfZuTF3egsVI92Td1tJ3L2hphz_AIE8DXecQzc-LbUtNPe4MC8YdiH7gb3C44t9GAaCzFbstTNkAuK4ilLFKUNHosezfz_O_qA7J4GspaszUH3FMe2uCWA6LshwKBZmljDBLPRM8MMaJQYHCZ2Taa3WhLSZWUPyqyX1gEECaw9-qKKWNZ37yHh" />
                                            </div>
                                            <span className="font-label-sm text-label-sm text-primary font-bold">Sarah</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                        <div className="bg-surface border border-outline-variant rounded-lg p-stack-lg shadow-[0px_4px_20px_rgba(30,41,59,0.05)]">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-secondary">verified</span>
                                <h3 className="font-headline-md text-headline-md text-primary">Verified Skills</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full border border-outline-variant font-label-md text-label-md">React.js</span>
                                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full border border-outline-variant font-label-md text-label-md">TypeScript</span>
                                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full border border-outline-variant font-label-md text-label-md">Design Systems</span>
                                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full border border-outline-variant font-label-md text-label-md">GraphQL</span>
                                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full border border-outline-variant font-label-md text-label-md">Web Performance</span>
                            </div>
                        </div>
                        <div className="bg-surface border border-outline-variant rounded-lg p-stack-lg shadow-[0px_4px_20px_rgba(30,41,59,0.05)] relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 opacity-10">
                                <span className="material-symbols-outlined text-[120px] text-secondary" data-weight="fill">track_changes</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-secondary">visibility</span>
                                    <h3 className="font-headline-md text-headline-md text-primary">Recent Focus</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-outline-variant mt-1 text-[18px]">check_circle</span>
                                        <p className="font-body-md text-body-md text-on-surface">Architecting micro-frontends for scalable enterprise apps.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-outline-variant mt-1 text-[18px]">check_circle</span>
                                        <p className="font-body-md text-body-md text-on-surface">Mentoring junior developers in functional programming.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-outline-variant mt-1 text-[18px]">check_circle</span>
                                        <p className="font-body-md text-body-md text-on-surface">Exploring WebGL for data visualization interfaces.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </section>
    )
}
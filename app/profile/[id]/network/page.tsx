import { members, organizations } from "@/lib/data/seed";
import { getMemberSkills } from "@/utils/skill";
import Link from "next/link";

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
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-2 border-b border-outline-variant pb-4">
                        <div>
                            <h1 className="font-headline-lg text-headline-lg text-primary">
                                Network Members
                            </h1>

                            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                Explore people across the Kindred network.
                            </p>
                        </div>

                        <span className="font-label-md text-label-md text-on-surface-variant">
                            {members.length} members
                        </span>
                    </div>

                    {/* Members Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                        {members.map((member) => {
                            const organization = organizations.find(
                                (org) => org.id === member.organizationId
                            );

                            const memberSkills = getMemberSkills(member.id);

                            return (
                                <div
                                    key={member.id}
                                    className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-ambient-lvl1 p-stack-lg group hover:border-secondary hover:shadow-ambient-lvl2 transition-all"
                                >
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-5">
                                        <Link
                                            href={`/profile/${member.id}`}
                                            className="flex items-center gap-4 min-w-0"
                                        >
                                            <div className="w-14 h-14 shrink-0 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-md text-lg">
                                                {member.initials}
                                            </div>

                                            <div className="min-w-0">
                                                <h2 className="font-headline-md text-headline-md text-primary group-hover:text-secondary transition-colors truncate">
                                                    {member.name}
                                                </h2>

                                                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                                    {member.role}
                                                </p>
                                            </div>
                                        </Link>

                                        <button
                                            type="button"
                                            className="shrink-0 w-9 h-9 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                                            title="Connect"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                add_link
                                            </span>
                                        </button>
                                    </div>

                                    {/* Organization */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-secondary text-[18px]">
                                            business
                                        </span>

                                        <span className="font-label-md text-label-md text-on-surface">
                                            {organization?.name ?? "Independent"}
                                        </span>

                                        {organization?.industry && (
                                            <>
                                                <span className="text-outline-variant">•</span>

                                                <span className="text-sm text-on-surface-variant">
                                                    {organization.industry}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* Bio */}
                                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">
                                        {member.bio}
                                    </p>

                                    {/* Skills */}
                                    <div className="pt-5 border-t border-outline-variant">
                                        <div className="flex flex-wrap gap-2">
                                            {memberSkills.slice(0, 4).map((skill) => (
                                                <span
                                                    key={skill.id}
                                                    className="px-3 py-1.5 bg-surface-container-low border border-outline-variant text-on-surface rounded-lg font-label-sm text-label-sm"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}

                                            {memberSkills.length > 4 && (
                                                <span className="px-3 py-1.5 text-label-sm text-on-surface-variant">
                                                    +{memberSkills.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-6">
                                        <Link
                                            href={`/profile/${member.id}`}
                                            className="font-label-md text-label-md text-primary hover:text-secondary transition-colors flex items-center gap-1"
                                        >
                                            View profile

                                            <span className="material-symbols-outlined text-[17px]">
                                                arrow_outward
                                            </span>
                                        </Link>

                                        <code className="text-xs text-on-surface-variant">
                                            #{member.id}
                                        </code>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </section>
    )
}
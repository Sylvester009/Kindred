import { members } from "@/app/data/member";
import { organizations } from "@/app/data/organization";
import { skills } from "@/app/data/skill";
import { getMemberProjects } from "@/utils/project";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Profile({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const member = members.find((member) => member.id === id);

    if (!member) {
        notFound();
    }

    const memberSkills = skills.filter((skill) =>
        member.skillIds.includes(skill.id)
    );

    const memberProjects = getMemberProjects(member.projectIds);

    const organization = organizations.find(
        (organization) => organization.id === member.organizationId
    );

    return (
        <section className="bg-background text-on-background font-body-md min-h-screen flex antialiased">
            <aside className="hidden md:flex flex-col h-full w-64 bg-surface-container-low-container py-stack-lg fixed left-0 top-0 z-40 border-r border-outline-variant">
                <div className="px-6 mb-8 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full mb-4 overflow-hidden shadow-ambient-lvl1 bg-secondary text-on-secondary flex items-center justify-center">
                        <span className="font-headline-md text-2xl">
                            {member.initials}
                        </span>
                    </div>
                    <h2 className="font-headline-md text-headline-md font-bold text-primary text-center">{member.name}</h2>
                    <p className="font-label-md text-label-md text-secondary mt-1 text-center">{member.role}</p>
                </div>

                <div className="px-6 mt-auto">
                    <div className="p-4 rounded-lg bg-surface border border-outline-variant">
                        <p className="text-xs text-on-surface-variant mb-1">
                            Member ID
                        </p>

                        <code className="text-sm font-medium text-primary">
                            {member.id}
                        </code>
                    </div>
                </div>

            </aside>
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <header className="bg-surface shadow-sm sticky top-0 z-30 w-full hidden md:block">
                    <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max-width mx-auto">
                        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary">
                            Kindred
                        </Link>

                        <div className="flex items-center gap-4 text-primary">
                            <span className="text-sm text-on-surface-variant">
                                Member Profile
                            </span>

                            <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                                <span className="text-xs font-bold">
                                    {member.initials}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
                    <section className="mb-12 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-ambient-lvl1 p-stack-lg">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">{member.name}</h1>
                                <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 max-w-120">{member.bio}</p>
                            </div>
                            <Link
                                href={`/profile/${member.id}/network`} className="w-full md:w-auto bg-primary text-on-primary px-6 py-4 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:shadow-ambient-lvl2 hover:-translate-y-0.5 transition-all duration-200">
                                <span className="material-symbols-outlined">explore</span>
                                Explore my network
                            </Link>
                        </div>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                        <section className="md:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-ambient-lvl1 p-stack-lg flex flex-col hover:shadow-ambient-lvl2 transition-shadow">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-secondary">code</span>
                                <h3 className="font-headline-md text-headline-md text-primary">Skills Map</h3>
                            </div>
                            {memberSkills.length > 0 ? (
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {memberSkills.map((skill) => (
                                        <span key={skill.id} className="px-4 py-2 bg-surface-container-low border border-outline-variant text-on-surface rounded-lg font-label-md text-label-md"> {skill.name}</span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-on-surface-variant">
                                    No skills added yet.
                                </p>
                            )}
                        </section>
                        <section className="md:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-ambient-lvl1 p-stack-lg hover:shadow-ambient-lvl2 transition-shadow relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-secondary-container opacity-10 rounded-bl-full"></div>
                            <div className="flex items-center gap-2 mb-6 relative z-10">
                                <span className="material-symbols-outlined text-secondary">corporate_fare</span>
                                <h3 className="font-headline-md text-headline-md text-primary">Current Organization</h3>
                            </div>
                            <div className="flex items-center gap-4 p-4 border border-outline-variant rounded-lg bg-surface">
                                <div className="w-12 h-12 rounded bg-primary-container flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-on-primary">layers</span>
                                </div>
                                <div>
                                    <h4 className="font-label-md text-label-md text-primary">{organization?.name ?? "No organization"}</h4>
                                    <p className="font-body-md text-body-md text-on-surface-variant text-sm">{member.role}</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="px-2 py-1 bg-surface-container-low text-on-surface-variant text-[10px] uppercase font-bold rounded border border-outline-variant">Active</span>
                                </div>
                            </div>
                        </section>
                        <section className="md:col-span-12 mt-4">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-secondary">rocket_launch</span>
                                <h3 className="font-headline-md text-headline-md text-primary">Featured Projects</h3>
                            </div>
                            {memberProjects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                                    {memberProjects.map((project) => (
                                        <a
                                            key={project.id}
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-ambient-lvl1 p-stack-lg group hover:border-secondary hover:shadow-ambient-lvl2 transition-all"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-headline-md text-headline-md text-primary group-hover:text-secondary transition-colors">
                                                        {project.name}
                                                    </h4>

                                                    <span className="text-xs text-on-surface-variant">
                                                        {project.industry}
                                                    </span>
                                                </div>

                                                <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">
                                                    arrow_outward
                                                </span>
                                            </div>

                                            <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">
                                                {project.description}
                                            </p>

                                            <span className="text-xs text-on-surface-variant">
                                                View project →
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg">
                                    <p className="text-sm text-on-surface-variant">
                                        No projects added yet.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div >
        </section >
    )
}
import Link from "next/link";
import { members } from "./data/member";
import { getMemberSkills } from "@/utils/skill";
import { organizations } from "./data/organization";

export default function Dashboard() {

  return (
    <section className="bg-surface text-on-surface min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg pointer-events-none z-0"></div>
      <div className="flex h-screen w-full relative z-10 overflow-hidden">

        <main className="grow flex flex-col h-full overflow-y-auto bg-surface relative z-10">
          <header className="w-full flex justify-between items-center px-8 py-4 bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-30">
            <div>
              <div className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Kindred</div>
            </div>
            <div className="w-full max-w-2xl relative">
              <div className="relative flex items-center w-full border border-outline-variant rounded-xl focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary transition-all bg-surface">
                <span className="material-symbols-outlined ml-4 text-on-surface-variant" data-icon="search">search</span>
                <input className="w-full bg-transparent border-none font-body-md text-body-md text-on-surface py-3 px-4 focus:ring-0 placeholder:text-outline" placeholder="Search your network, skills, or organizations..." type="text" />
              </div>
            </div>

          </header>
          <div className="p-8 flex flex-col gap-8 max-w-container-max-width mx-auto w-full pb-24">
            <section>
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Network Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
                    <span className="material-symbols-outlined" data-icon="group">group</span>
                    <span className="font-label-md">Total Connections</span>
                  </div>
                  <div className="text-4xl font-headline-lg text-primary">1,248</div>
                  <div className="text-secondary font-label-sm mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span> +12 this week
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
                    <span className="material-symbols-outlined" data-icon="hub">hub</span>
                    <span className="font-label-md">Unique Skills Mapped</span>
                  </div>
                  <div className="text-4xl font-headline-lg text-primary">342</div>
                  <div className="text-secondary font-label-sm mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span> +5 new skills
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
                    <span className="material-symbols-outlined" data-icon="business">business</span>
                    <span className="font-label-md">Organizations Reached</span>
                  </div>
                  <div className="text-4xl font-headline-lg text-primary">87</div>
                  <div className="text-on-surface-variant font-label-sm mt-2">Across 12 industries</div>
                </div>
              </div>
            </section>


            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="font-headline-md text-headline-md text-primary">
                  Members
                </h2>

                <span className="text-sm text-on-surface-variant">
                  {members.length} members
                </span>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface-container-low border-b border-outline-variant">
                      <tr className="text-left">
                        <th className="px-4 py-3 font-label-sm text-on-surface-variant uppercase tracking-wide">
                          Member
                        </th>

                        <th className="px-4 py-3 font-label-sm text-on-surface-variant uppercase tracking-wide">
                          Position
                        </th>

                        <th className="px-4 py-3 font-label-sm text-on-surface-variant uppercase tracking-wide">
                          Skills
                        </th>

                        <th className="px-4 py-3 font-label-sm text-on-surface-variant uppercase tracking-wide">
                          Member ID
                        </th>

                        <th className="px-4 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {members.map((member) => {
                        const organization = organizations.find(
                          (org) => org.id === member.organizationId
                        );

                        const memberSkills = getMemberSkills(member.id);

                        return (
                          <tr
                            key={member.id}
                            className="border-b border-outline-variant last:border-b-0 hover:bg-surface-container-low transition-colors"
                          >
                            {/* Member */}
                            <td className="px-4 py-4">
                              <Link
                                href={`/profile/${member.id}`}
                                className="flex items-center gap-4 min-w-60 group"
                              >
                                <div className="w-12 h-12 shrink-0 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-md text-lg">
                                  {member.initials}
                                </div>

                                <div>
                                  <div className="font-label-md text-primary group-hover:underline underline-offset-4">
                                    {member.name}
                                  </div>

                                  <div className="text-sm text-on-surface-variant">
                                    {organization?.name ?? "No organization"}
                                  </div>
                                </div>
                              </Link>
                            </td>

                            {/* Position */}
                            <td className="px-4 py-4">
                              <div className="font-body-sm text-on-surface">
                                {member.role}
                              </div>

                              <div className="text-xs text-on-surface-variant">
                                {organization?.name ?? "No organization"}
                              </div>
                            </td>

                            {/* Skills */}
                            <td className="px-4 py-4">
                              {memberSkills.length ? (
                                <div className="flex flex-wrap gap-2 max-w-md">
                                  {memberSkills.slice(0, 3).map((skill) => (
                                    <span
                                      key={skill.id}
                                      className="px-2 py-1 bg-surface-container-high rounded text-xs text-primary font-medium whitespace-nowrap"
                                    >
                                      {skill.name}
                                    </span>
                                  ))}

                                  {memberSkills.length > 3 && (
                                    <span className="px-2 py-1 text-xs text-on-surface-variant">
                                      +{memberSkills.length - 3}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-xs text-on-surface-variant">
                                  No skills added
                                </span>
                              )}
                            </td>

                            {/* ID */}
                            <td className="px-4 py-4">
                              <code className="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                                {member.id}
                              </code>
                            </td>

                            {/* Action */}
                            <td className="px-4 py-4 text-right">
                              <Link
                                href={`/profile/${member.id}`}
                                className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-label-md text-primary hover:bg-surface-container transition-colors"
                              >
                                View profile
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </section>
  );
}

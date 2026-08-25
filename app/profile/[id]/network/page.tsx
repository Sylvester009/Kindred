"use client";

import { members } from "@/lib/data/seed";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface NetworkMember {
    id: string;
    name: string;
    initials: string;
    role: string;
    bio: string;
    degree: number;
}

interface NetworkPathMember {
    id: string;
    name: string;
    initials: string | null;
    role: string | null;
}

interface NetworkResult {
    memberId: string;
    network: NetworkMember[];
    paths: Record<string, NetworkPathMember[]>;
}

export default function Network({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [memberId, setMemberId] = useState("");
    const [network, setNetwork] = useState<NetworkResult | null>(null);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    /*
     * Get the member ID from the dynamic route.
     */
    useEffect(() => {
        params.then(({ id }) => {
            setMemberId(id);
        });
    }, [params]);

    /*
     * Fetch the member's entire network.
     */
    useEffect(() => {
        if (!memberId) return;

        async function fetchNetwork() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `/api/members/${memberId}/network`
                );

                if (!response.ok) {
                    throw new Error("Failed to load network");
                }

                const data: NetworkResult = await response.json();

                setNetwork(data);
            } catch (err) {
                console.error("Failed to fetch network:", err);
                setError(
                    "We couldn't load your network. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchNetwork();
    }, [memberId]);

    /*
     * Search the network.
     *
     * We search name and role.
     */
    const searchResults = useMemo(() => {
        if (!network || !search.trim()) {
            return [];
        }

        const query = search.trim().toLowerCase();

        return network.network.filter((member) => {
            return (
                member.name.toLowerCase().includes(query) ||
                member.role.toLowerCase().includes(query)
            );
        });
    }, [network, search]);

    /*
     * Get the connection path for a member.
     */
    const getPath = (memberId: string) => {
        if (!network) return [];

        return network.paths[memberId] ?? [];
    };

    /*
     * The degree is determined by the path.
     *
     */
    const getDegree = (memberId: string) => {
        const path = getPath(memberId);

        return Math.max(path.length - 1, 0);
    };

    const getDegreeLabel = (degree: number) => {
        switch (degree) {
            case 1:
                return "Direct connection";

            case 2:
                return "2nd degree connection";

            case 3:
                return "3rd degree connection";

            default:
                return "Connection";
        }
    };

    const member = members.find(member => member.id === memberId);

    return (
        <section className="bg-background text-on-background antialiased min-h-screen flex flex-col">
            <header className="bg-surface shadow-sm docked full-width top-0 z-50">
                <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max-width mx-auto">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="font-headline-md text-headline-md font-bold text-primary"
                        >
                            Kindred
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-md">
                            {member?.initials}
                        </div>
                    </div>
                </div>
            </header>
            <main className="grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
                <aside className="md:col-span-3 flex flex-col gap-stack-lg h-fit sticky top-24">
                    <div className="bg-surface-lowest border border-outline-variant rounded-lg p-stack-lg shadow-[0px_4px_20px_rgba(30,41,59,0.05)]">
                        <h2 className="font-headline-md text-headline-md text-primary">
                            Find a Connection
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 mb-6">
                            Search for someone in your network and discover how you are connected.
                        </p>
                        <label
                            htmlFor="network-search"
                            className="block font-label-md text-label-md text-on-surface-variant mb-3"
                        >
                            Search network
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                                search
                            </span>
                            <input
                                id="network-search"
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search a name..."
                                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-body-md outline-none transition-all placeholder:text-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary"
                            />
                        </div>
                    </div>
                    <div className="bg-surface-container-low border border-outline-variant rounded-lg p-stack-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                                    Network Reach
                                </p>
                                <p className="font-headline-md text-headline-md text-primary">
                                    {network?.network.length ?? 0}
                                </p>
                                <p className="text-sm text-on-surface-variant mt-1">
                                    people within 3 degrees
                                </p>
                            </div>
                            <span className="material-symbols-outlined text-secondary text-3xl opacity-50">
                                hub
                            </span>
                        </div>
                    </div>
                </aside>
                <section className="md:col-span-9 flex flex-col gap-stack-lg">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-2 border-b border-outline-variant pb-4">
                        <div>
                            <h1 className="font-headline-lg text-headline-lg text-primary">
                                Network
                            </h1>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                Discover how you are connected to people across Kindred.
                            </p>
                        </div>
                        {search.trim() && (
                            <span className="font-label-md text-label-md text-on-surface-variant">
                                {searchResults.length}{" "}
                                {searchResults.length === 1
                                    ? "result"
                                    : "results"}
                            </span>
                        )}
                    </div>
                    {loading && (
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center">
                            <span className="material-symbols-outlined text-secondary text-3xl animate-spin">
                                progress_activity
                            </span>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-4">
                                Mapping your network...
                            </p>
                        </div>
                    )}
                    {!loading && error && (
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center text-center">
                            <span className="material-symbols-outlined text-error text-4xl">
                                error
                            </span>
                            <h2 className="font-headline-md text-headline-md text-primary mt-4">
                                Something went wrong
                            </h2>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                {error}
                            </p>
                        </div>
                    )}
                    {!loading &&
                        !error &&
                        !search.trim() && (
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl">
                                        hub
                                    </span>
                                </div>
                                <h2 className="font-headline-md text-headline-md text-primary mt-6">
                                    Discover your connections
                                </h2>
                                <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-2">
                                    Search for someone in your network to see
                                    exactly how you are connected to them.
                                </p>
                            </div>
                        )}
                    {!loading &&
                        !error &&
                        search.trim() &&
                        searchResults.length === 0 && (
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-on-surface-variant">
                                        person_search
                                    </span>
                                </div>
                                <h2 className="font-headline-md text-headline-md text-primary mt-6">
                                    No connection found
                                </h2>
                                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2">
                                    We couldn't find anyone matching{" "}
                                    <span className="font-label-md text-primary">
                                        "{search}"
                                    </span>{" "}
                                    within your network.
                                </p>
                            </div>
                        )}
                    {!loading &&
                        !error &&
                        search.trim() &&
                        searchResults.length > 0 && (
                            <div className="flex flex-col gap-stack-lg">
                                {searchResults.map((member) => {

                                    const path = getPath(member.id);

                                    const degree = getDegree(member.id);

                                    return (
                                        <div
                                            key={member.id}
                                            className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-ambient-lvl1 p-stack-lg group hover:border-secondary hover:shadow-ambient-lvl2 transition-all"
                                        >
                                            <div className="flex flex-col gap-2 mb-6">
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-secondary text-[19px]">
                                                            route
                                                        </span>
                                                        <span className="font-label-md text-label-md text-secondary">
                                                            {getDegreeLabel(degree)}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-on-surface-variant">
                                                        {degree === 1
                                                            ? "1 step away"
                                                            : `${degree} steps away`}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-surface-container-low rounded-xl border border-outline-variant p-5 mb-6">
                                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-5">
                                                    Connection path
                                                </p>
                                                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                                                    {path.map(
                                                        (
                                                            pathMember,
                                                            index
                                                        ) => {
                                                            const isStart =
                                                                index === 0;
                                                            const isEnd =
                                                                index ===
                                                                path.length -
                                                                1;
                                                            const isOrganization =
                                                                !pathMember.initials &&
                                                                !pathMember.role;
                                                            return (
                                                                <div
                                                                    key={`${pathMember.id}-${index}`}
                                                                    className="flex items-center gap-3 shrink-0"
                                                                >
                                                                    <div className="flex flex-col items-center gap-2 min-w-16">
                                                                        <div
                                                                            className={`
                                                                                w-11 h-11 flex items-center justify-center
                                                                                font-label-md
                                                                                border
                                                                                ${isStart
                                                                                    ? "rounded-full bg-primary text-on-primary border-primary"
                                                                                    : isEnd
                                                                                        ? "rounded-full bg-secondary text-on-secondary border-secondary"
                                                                                        : isOrganization
                                                                                            ? "rounded-lg bg-surface text-secondary border-secondary"
                                                                                            : "rounded-full bg-surface-container-high text-primary border-outline-variant"
                                                                                }
                                                                            `}
                                                                        >
                                                                            {isOrganization ? (
                                                                                <span className="material-symbols-outlined text-[20px]">
                                                                                    business
                                                                                </span>
                                                                            ) : (
                                                                                pathMember.initials ??
                                                                                pathMember.name
                                                                                    .charAt(
                                                                                        0
                                                                                    )
                                                                                    .toUpperCase()
                                                                            )}
                                                                        </div>
                                                                        <span
                                                                            className={`
                                                                                text-xs text-center max-w-24 truncate
                                                                                ${isStart ||
                                                                                    isEnd
                                                                                    ? "font-label-sm text-primary"
                                                                                    : "text-on-surface-variant"
                                                                                }
                                                                            `}
                                                                        >
                                                                            {isStart
                                                                                ? "You"
                                                                                : pathMember.name}
                                                                        </span>
                                                                    </div>
                                                                    {!isEnd && (
                                                                        <span className="material-symbols-outlined text-outline-variant text-[18px] shrink-0">
                                                                            arrow_forward
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <Link
                                                    href={`/profile/${member.id}`}
                                                    className="flex items-start gap-4 min-w-0 grow"
                                                >
                                                    <div className="w-16 h-16 shrink-0 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-md text-xl">
                                                        {member.initials}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h2 className="font-headline-md text-headline-md text-primary group-hover:text-secondary transition-colors">
                                                            {member.name}
                                                        </h2>
                                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                                            {member.role}
                                                        </p>
                                                        <p className="font-body-md text-body-md text-on-surface-variant mt-3 line-clamp-2">
                                                            {member.bio}
                                                        </p>
                                                    </div>
                                                </Link>
                                                <div className="shrink-0">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant text-primary font-label-md hover:bg-surface-container-low hover:border-secondary transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">
                                                            add_link
                                                        </span>
                                                        Connect
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-6 pt-5 border-t border-outline-variant">
                                                <span className="text-xs text-on-surface-variant">
                                                    Member ID #{member.id}
                                                </span>

                                                <Link
                                                    href={`/profile/${member.id}`}
                                                    className="font-label-md text-label-md text-primary hover:text-secondary transition-colors flex items-center gap-1"
                                                >
                                                    View profile
                                                    <span className="material-symbols-outlined text-[17px]">
                                                        arrow_outward
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                </section>
            </main>
        </section>
    );
}
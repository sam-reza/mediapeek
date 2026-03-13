import { buttonVariants } from '@mediapeek/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@mediapeek/ui/components/card';
import { cn } from '@mediapeek/ui/lib/utils';
import { Link } from 'react-router';

import { Footer } from '~/components/footer';
import { Header } from '~/components/header';
import { TrademarkNotice } from '~/components/media-view/trademark-notice';
import { MEDIA_CONSTANTS } from '~/lib/media/constants';

import type { Route } from './+types/route';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Home - MediaPeek' },
    {
      name: 'description',
      content:
        'Inspect media metadata from a URL in a clear, reliable interface.',
    },
  ];
};

const features = [
  {
    id: 'edge-analysis',
    title: 'Edge Analysis',
    summary:
      'Fetch only the data needed instead of downloading the full file.',
    points: [
      'Uses byte-range requests to reduce transfer and wait time.',
      'Works well with large files when full downloads are unnecessary.',
      'Processing runs on edge infrastructure close to users.',
    ],
  },
  {
    id: 'archive-extraction',
    title: 'Archive Extraction',
    summary:
      'Open common archives while keeping file context intact.',
    points: [
      'ZIP: Supports stored and DEFLATE-compressed archives.',
      'TAR: Supports standard tar archives, including @LongLink extended headers.',
      'Shows the archive name with the inner filename for clearer source context.',
    ],
  },
  {
    id: 'supported-sources',
    title: 'Supported Sources',
    summary: 'Works with common remote media sources.',
    points: [
      'Web servers: HTTP/HTTPS URLs with byte-range optimization.',
      'Google Drive: Public files and folders.',
    ],
  },
  {
    id: 'secure-sharing',
    title: 'Secure Sharing',
    summary: 'Share results through end-to-end encrypted PrivateBin links.',
    points: ['Sharing is designed for privacy-focused collaboration.'],
  },
  {
    id: 'output-formats',
    title: 'Output Formats',
    summary:
      'Export metadata in multiple formats for review, automation, or archiving.',
    points: [
      'Available formats: Object, JSON, Text, HTML, XML.',
      'Readable formats make file properties easier to review.',
    ],
  },
] as const;

const badges = [
  'dolby-vision',
  'dolby-atmos',
  'hdr',
  'hdr10-plus',
  '4k',
  'sd',
  'hd',
  'imax',
  'dts',
  'dts-x',
  'hi-res-lossless',
  'apple-digital-master',
  'aac',
  'cc',
  'sdh',
] as const;

const trademarkBadges = [
  MEDIA_CONSTANTS.BADGES.DOLBY_VISION,
  MEDIA_CONSTANTS.BADGES.DOLBY_ATMOS,
  MEDIA_CONSTANTS.BADGES.DOLBY_AUDIO,
  MEDIA_CONSTANTS.BADGES.IMAX,
  MEDIA_CONSTANTS.BADGES.DTS,
  MEDIA_CONSTANTS.BADGES.DTS_X,
  MEDIA_CONSTANTS.BADGES.HDR10_PLUS,
  MEDIA_CONSTANTS.BADGES.AV1,
];

const METADATA_ENGINE = {
  mediainfoJs: {
    version: '0.3.7',
    url: 'https://mediainfo.js.org/',
  },
  mediaInfoLib: {
    version: '25.10',
    url: 'https://github.com/MediaArea/MediaInfoLib',
  },
} as const;

export default function HomeRoute() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1">
        <section className="from-muted/35 to-background bg-linear-to-b">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-16 text-center sm:px-12 sm:py-24">
            <div className="relative h-28 w-28 sm:h-32 sm:w-32">
              <img
                src="/badges/icon-light.webp"
                alt="MediaPeek Logo"
                className="hidden h-full w-full object-contain dark:block"
              />
              <img
                src="/badges/icon-dark.webp"
                alt="MediaPeek Logo"
                className="h-full w-full object-contain dark:hidden"
              />
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              MediaPeek
            </h1>
            <p className="text-muted-foreground mt-5 max-w-3xl text-lg leading-relaxed sm:text-xl">
              Inspect media metadata from a URL in a clear, reliable interface.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                to="/app"
                viewTransition
                className={cn(buttonVariants({ size: 'lg' }), 'min-w-40')}
              >
                Open App
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pt-0 pb-16 sm:px-12 sm:pb-20">
          <div className="from-muted/30 to-background isolate overflow-hidden rounded-3xl border bg-linear-to-b p-2 shadow-sm sm:p-3">
            <div className="bg-background overflow-hidden rounded-2xl border">
              <iframe
                src="/preview"
                title="MediaPeek Preview"
                className="h-[920px] w-full bg-transparent"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-12 sm:pb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Key Features
            </h2>
            <p className="text-muted-foreground mt-3 max-w-3xl text-lg leading-relaxed">
              A quick view of the capabilities built into MediaPeek.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, idx) => (
              <Card
                key={feature.id}
                className={cn(
                  'border-border/70 bg-background/90',
                  idx === 0 && 'md:col-span-2',
                )}
              >
                <CardHeader className="border-b pb-6">
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
                    Feature {String(idx + 1).padStart(2, '0')}
                  </p>
                  <CardTitle
                    className={cn(
                      'tracking-tight',
                      idx === 0 ? 'text-3xl' : 'text-2xl',
                    )}
                  >
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div
                    className={cn(
                      'grid gap-3',
                      idx === 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-1',
                    )}
                  >
                    {feature.points.map((point) => (
                      <div
                        key={point}
                        className="bg-muted/35 rounded-xl border px-4 py-3 text-sm leading-relaxed"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-12 sm:pb-20">
          <Card className="border-border/70 from-muted/25 to-background bg-linear-to-b">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Format badges
              </CardTitle>
              <CardDescription className="max-w-3xl text-base leading-relaxed">
                Badge assets are sourced from Apple TV and Apple Music for
                consistent media labeling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {badges.map((badge) => (
                  <div
                    key={badge}
                    className="bg-background/70 flex items-center justify-center rounded-xl border p-4"
                  >
                    <img
                      src={`/badges/${badge}.svg`}
                      alt={`${badge} badge`}
                      className="h-6 w-auto object-contain grayscale dark:invert"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="text-muted-foreground mt-6 space-y-2 text-sm leading-relaxed">
                <p>
                  SD, HD, 4K, HDR, HDR10+, and related video badge assets are
                  sourced from Apple TV.
                </p>
                <p>
                  Lossless, Hi-Res Lossless, Apple Digital Master, Spatial
                  Audio, and AAC badge assets are sourced from Apple Music.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-12 sm:pb-20">
          <div className="from-muted/35 via-background to-muted/10 border-border/70 overflow-hidden rounded-[2rem] border bg-linear-to-br">
            <div className="space-y-6 px-6 py-8 sm:px-10 sm:py-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="shrink-0">
                  <img
                    src="/badges/mediainfo.svg"
                    alt="MediaInfo Logo"
                    className="h-16 w-16 object-contain dark:hidden"
                  />
                  <img
                    src="/badges/mediainfo-light.svg"
                    alt="MediaInfo Logo"
                    className="hidden h-16 w-16 object-contain dark:block"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                    Metadata engine
                  </h2>
                  <p className="text-muted-foreground max-w-3xl text-base leading-relaxed sm:text-lg">
                    MediaPeek uses mediainfo.js for metadata analysis. It runs
                    through WebAssembly and is based on MediaInfoLib.
                  </p>
                </div>
              </div>

              <div className="border-border/60 text-muted-foreground flex flex-col gap-2 border-y py-4 text-sm leading-relaxed sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <a
                  href={METADATA_ENGINE.mediainfoJs.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  mediainfo.js v{METADATA_ENGINE.mediainfoJs.version}
                </a>
                <a
                  href={METADATA_ENGINE.mediaInfoLib.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  MediaInfoLib v{METADATA_ENGINE.mediaInfoLib.version}
                </a>
                <p>Metadata parsing runs in WebAssembly.</p>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Analysis uses mediainfo.js, a WebAssembly port of MediaInfo
                library, Copyright (c) 2002-2026 MediaArea.net SARL.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-12 sm:pb-20">
          <div className="from-muted/35 via-background to-muted/15 border-border/70 overflow-hidden rounded-[2rem] border bg-linear-to-br">
            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <div className="space-y-6">
                <div
                  className="inline-flex"
                  data-testid="github-brand-lockup"
                >
                  <img
                    src="/brand/github/GitHub_Lockup_Black_Clearspace.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-8 w-auto object-contain dark:hidden"
                  />
                  <img
                    src="/brand/github/GitHub_Lockup_White_Clearspace.svg"
                    alt=""
                    aria-hidden="true"
                    className="hidden h-8 w-auto object-contain dark:block"
                  />
                </div>

                <div className="space-y-3">
                  <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                    Built in public, maintained on GitHub.
                  </h2>
                  <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">
                    MediaPeek is open source. Browse the repository on GitHub,
                    review issues, track releases, and follow development.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <a
                    href="https://github.com/DG02002/mediapeek"
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ size: 'lg', variant: 'outline' }),
                      'min-w-48',
                    )}
                  >
                    View Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-12 sm:pb-20">
          <div className="from-muted/35 via-background to-muted/10 border-border/70 overflow-hidden rounded-[2rem] border bg-linear-to-br">
            <div className="space-y-6 px-6 py-8 sm:px-10 sm:py-10">
              <div className="space-y-3">
                <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                  Trademark and attribution notices
                </h2>
                <p className="text-muted-foreground max-w-3xl text-base leading-relaxed sm:text-lg">
                  Third-party marks remain the property of their respective
                  owners. MediaPeek references them for identification only.
                </p>
              </div>

              <div className="border-border/60 text-muted-foreground border-y py-4 text-sm leading-relaxed">
                <p>Trademark notices are shown for the formats displayed above.</p>
              </div>

              <TrademarkNotice badges={trademarkBadges} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

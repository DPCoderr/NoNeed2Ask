This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local design previews

With `npm run dev`, open `/preview-design/dashboard` or
`/preview-design/applications`. The page and scenario selectors let you inspect
filled, empty, loading, error, and feature-specific states without a backend.
`/design-preview` remains available as a dashboard preview alias.

Previews reuse the application UI with deterministic sample data. Search, filters,
sorting, pagination, and deletion in the applications preview affect local state
only. Edit and other unfinished destinations show a preview notice. The real API,
authentication, and mutation implementations are not used by previews.

Every preview route returns 404 outside development. Add future page previews to
`app/preview-design/[pageName]/page.tsx` and reuse `PreviewFrame` and its scenario
selector rather than creating a second copy of a page's UI.

## Quality checks

Run the full frontend verification before review:

```bash
npm run check
```

For faster feedback while developing, use `npm run lint`, `npm run typecheck`,
`npm run test`, or `npm run test:watch` separately. Application code is organized
by route or feature; generated shadcn primitives remain in `components/ui`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

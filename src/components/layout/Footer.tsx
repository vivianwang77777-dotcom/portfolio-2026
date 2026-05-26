import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/content";
import Link from "next/link";

export function Footer() {
  const phone = siteConfig.social.phone;

  return (
    <footer className="border-t border-border py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-2xl tracking-tight sm:text-3xl">
              {siteConfig.footer.headline[0]}
              <br />
              <span className="text-muted">{siteConfig.footer.headline[1]}</span>
            </p>
            <a
              href={`tel:${phone}`}
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              {siteConfig.footer.contactLabel}：{phone}
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/" className="hover:text-foreground">
                  {siteConfig.footer.homeLabel}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.year} {siteConfig.name}。保留所有权利。
          </p>
          <p>{siteConfig.location}</p>
        </div>
      </Container>
    </footer>
  );
}

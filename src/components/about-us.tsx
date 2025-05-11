import { cn } from "~/lib/utils";

const contactItems = [
  {
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    label: "直接致電",
    content: (
      <a
        href="tel:+85291448754"
        className="text-xl font-medium text-foreground transition hover:text-primary"
      >
        +852 9144 8754
      </a>
    ),
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
    label: "訪問我們的拍賣網站 1",
    content: (
      <a
        href="https://carousell.app.link/hcZwiI6r4Sb"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-medium text-foreground transition hover:text-primary"
      >
        Joseph
      </a>
    ),
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
    label: "訪問我們的拍賣網站 2",
    content: (
      <a
        href="https://carousell.app.link/7IaAob6kLSb"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-medium text-foreground transition hover:text-primary"
      >
        Joseph Chan
      </a>
    ),
  },
  {
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    label: "親臨本店",
    content: (
      <p className="max-w-60 text-xl font-medium text-foreground">
        荃灣柴灣角街77-81號
        <br />
        致利工業大廈20樓B2室
      </p>
    ),
  },
];

export function AboutUsSection({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("grid gap-12 pb-16 md:grid-cols-2 lg:gap-24", className)}>
      {/* Contact Card */}
      <div className="rounded-2xl bg-background p-8 shadow-lg border">
        <div className="space-y-8">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              {item.icon}
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.label}</p>
                {item.content}
              </div>
            </div>
          ))}

          {/* Social Links */}
          <div className="border-t border-border pt-6">
            <p className="mb-4 max-w-xs text-sm text-muted-foreground">
              歡迎親臨本店參觀選購，請先聯絡預約時間。謝謝。
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="overflow-hidden rounded-2xl bg-muted shadow-lg">
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.489269381036!2d114.10647161137274!3d22.372905540173978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f8ef92a0332d%3A0xf3b9dce9a0f6050a!2sGlee%20Industrial%20Building!5e0!3m2!1sen!2shk!4v1738343217295!5m2!1sen!2shk&language=zh-TW"
          className="h-full min-h-[400px] w-full"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export function AboutUs() {
  return (
    <>
      {/* Header Section */}
      <div className="p-10 text-center">
        <h1 className="mb-4 text-xl md:text-3xl font-bold text-foreground">
          關於 eeshophk
        </h1>
        {/* <p className="mx-auto max-w-2xl text-xs font-medium text-muted-foreground md:text-sm">
          Crafting digital experiences that inspire and connect since 2015.
          We&apos;re a passionate team of designers and developers based in
          Portland.
        </p> */}
      </div>

      <AboutUsSection />
    </>
  );
}

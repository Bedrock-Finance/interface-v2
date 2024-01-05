// verticalNavbar.tsx

import { useState } from 'react';
import styles from './navbar.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useIsMounted } from 'usehooks-ts';

export function VerticalNavbar({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) {
  const [openSections, setOpenSections] = useState<boolean[]>([true, false, false]);

  const toggleSection = (index: number) => {
    const updatedSections = [...openSections];
    updatedSections[index] = !updatedSections[index]; // Toggle the state of the clicked section
    setOpenSections(updatedSections);
  };

  const isMounted = useIsMounted();

  const sectionData = [
    {
      title: 'BedrockMint',
      image: '/assets/icons/coins-solid.svg',
      links: [
        { text: 'BedrockMint v1', href: '/app/factory' },
        { text: 'My Tokens', href: '/app/mytokens' },
      ],
    },
    {
      title: 'Swap',
      image: '/assets/icons/rotate-solid.svg',
      links: [
        { text: 'Equalizer', href: 'https://equalizer.exchange/swap' },
      ],
    },
    {
      title: 'Connect',
      image: '/assets/icons/hashtag.svg',
      links: [
        { text: 'Twitter', href: 'https://twitter.com/BDRKFI' },
        { text: 'Discord', href: 'https://discord.gg/3rTXvSRasK' },
        { text: 'YouTube', href: 'https://www.youtube.com/@bedrockfi' },
        { text: 'Github', href: 'https://github.com/Bedrock-Finance' },
        { text: 'Instagram', href: 'https://www.instagram.com/bdrkdefi/' }
      ],
    },
    {
      title: 'Contact',
      image: '/assets/icons/envelope-solid.svg',
      links: [
        { text: 'Support', href: 'mailto:contact@bedrockfi.org' },
        { text: 'Founder', href: 'mailto:henry@bedrockfi.org' },

      ],
    }
  ];

  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <nav className={`${styles.navbar} ${isOpen ? styles.open : ''}`}>
        {sectionData.map((section, index) => (
          <div className={`${styles.navbarSection}`} key={index}>
            <div onClick={() => toggleSection(index)} className={styles.sectionHeader}>
              <Image src={section.image} width={20} height={20} alt="icon" className={styles.sectionIcon}/>
              <p className={styles.navbarSectionTitle}>{section.title}</p>
              <Image src="/assets/icons/dropdown.svg" alt="dropdown" width={20} height={20} className={`${styles.dropdownIcon} ${openSections[index] && styles.flipped}`} />
            </div>
            <div className={`${openSections[index] && styles.show} ${styles.navbarLinks}`}>
                {section.links.map((link, linkIndex) => (
                  <Link href={link.href} key={linkIndex} target={!link.href.startsWith("/") ? "_blank" : "_self"}>
                    <p className={`${styles.navbarText} ${ link.href === pathname ? styles.activeLink : ''}`}>{link.text}</p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </nav>
      <div className={`${isOpen ? styles.page : styles.noNavbar}`}>
        {children}
      </div>
    </div>
  );
}

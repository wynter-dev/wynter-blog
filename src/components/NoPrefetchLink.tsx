import Link from 'next/link';
import {ComponentProps} from 'react';

export default function NoPrefetchLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}

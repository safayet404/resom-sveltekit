import type { IconTheme } from '../core/types';
interface Props {
    primary?: IconTheme['primary'];
    secondary?: IconTheme['secondary'];
}
declare const LoaderIcon: import("svelte").Component<Props, {}, "">;
type LoaderIcon = ReturnType<typeof LoaderIcon>;
export default LoaderIcon;

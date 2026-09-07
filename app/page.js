import { getAllNotes } from '../lib/notes';
import Home from './home';

const Page = () => <Home notes={getAllNotes()} />;

export default Page;

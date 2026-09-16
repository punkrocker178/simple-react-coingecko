import { GitBranch } from "lucide-react";

const GITHUB_REPO_URL = "https://github.com/punkrocker178/simple-react-coingecko";
const COINGECKO_URL = "https://www.coingecko.com";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:px-6 lg:px-8">
        <p>
          Data provided by &nbsp;
          <a
            href={COINGECKO_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-slate-800 transition hover:text-sky-600 hover:underline"
          >
            CoinGecko
          </a>
        </p>

        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="View project on GitHub"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
        >
          <GitBranch className="h-4 w-4" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;

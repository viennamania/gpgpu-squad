import * as Dialog from '@radix-ui/react-dialog';

const TermsModal = () => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="dialogOverlayAnimation fixed inset-0 z-50 bg-[#00000080] backdrop-blur-md" />
      <Dialog.Content className="dialogContentAnimation fixed left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-xl border border-[#1B1D21] bg-[#0A0A0A] py-4 pl-[18px] pr-[14px] focus:outline-none lg:h-[600px] lg:w-[343px]">
        <div className="flex items-start justify-between">
          <Dialog.Title className="text-[18px] font-medium leading-[21.6px]">
            Risk Disclaimer for Token and
            <br />
            NFT Investments
          </Dialog.Title>
          <Dialog.Close className="outline-none">
            <img
              width={16.5}
              height={16.5}
              className="p-1"
              alt="close icon"
              src="/close.svg"
            />
          </Dialog.Close>
        </div>

        <div className="mt-3">
          <Dialog.Description className="text-xs leading-[16.8px] text-[#8E9199]">
            Investing in tokens and NFTs (Non-Fungible Tokens) entails
            significant risks, and it's essential to understand these risks
            thoroughly before proceeding. Below is a comprehensive disclaimer
            outlining various aspects related to token and NFT investments:
          </Dialog.Description>
        </div>
        <div className="mt-4 rounded-md bg-[#141414] py-4 pl-8 pr-4">
          <ol className="flex list-decimal flex-col gap-1 text-xs leading-[16.8px] text-[#8E9199]">
            <li>
              Materials Disclaimer: The materials provided by the company,
              including but not limited to whitepapers, websites, and
              informational documents, are for reference purposes only. They are
              not intended as solicitation for investment and should not be
              construed as such.
            </li>
            <li>
              Profit and Loss Attribution: Any profits or losses incurred as a
              result of token and NFT investments are the sole responsibility of
              the investor. The company does not guarantee returns on
              investments, and investors should be prepared for the possibility
              of losing some or all of their invested capital.
            </li>
            <li>
              Risk of Crypto Investments: Investing in tokens and NFTs involves
              inherent risks. The volatile nature of cryptocurrency markets can
              lead to rapid and substantial fluctuations in asset prices.
              Investors should be aware of and understand these risks before
              investing.
            </li>
            <li>
              Potential Changes in Usage: The intended usage of tokens and NFTs
              may change at any time. Factors such as regulatory developments,
              market demands, and technological advancements can influence the
              utility and value of these assets. Investors should be prepared
              for potential shifts in the purpose and functionality of their
            </li>
            <li>
              Company Commitment to Project Success: While the company will
              strive to ensure the success of its projects, there are no
              guarantees of achievement. External factors beyond the company's
              control, such as market conditions and regulatory changes, can
              impact project outcomes. The company will dedicate its best
              efforts to project development and execution but cannot guarantee
              specific results.
            </li>
            <li>
              Market and Regulatory Risks: The cryptocurrency and NFT markets
              are subject to various risks, including regulatory uncertainty,
              security vulnerabilities, and market manipulation. Changes in
              government policies or regulations can have a significant impact
              on the legality and viability of token and NFT investments.
            </li>
            <li>
              Lack of Regulation and Legal Protections: Unlike traditional
              financial markets, the cryptocurrency and NFT sectors are
              relatively unregulated. Investors may not have the same legal
              protections and recourse mechanisms available in traditional
              investment environments. It's essential for investors to conduct
              thorough due diligence and seek professional advice before making
              investment decisions.
            </li>
            <li>
              Technological Risks: Token and NFT investments rely on blockchain
              technology, which is still evolving and subject to technical risks
              and vulnerabilities. Smart contract bugs, network congestion, and
              cybersecurity threats could affect the integrity and functionality
              of blockchain-based assets.
            </li>
            <li>
              Liquidity Risks: Token and NFT investments may suffer from
              liquidity issues, especially for assets with limited trading
              volumes or market interest. Illiquid markets can make it
              challenging to buy or sell assets at desired prices, potentially
              leading to losses or missed opportunities.
            </li>
            <li>
              Diversification and Risk Management: Investors should practice
              prudent risk management strategies, including diversification
              across asset classes and thorough risk assessments before
              allocating funds to token and NFT investments. Diversification can
              help mitigate the impact of adverse market events on investment
              portfolios.
            </li>
          </ol>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default TermsModal;

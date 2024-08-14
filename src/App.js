
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Logopage } from './components/logoPage/Logopage';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BetSlip } from './BetSlip';
import { Home } from './components/home/Home';
import { History } from './components/history/History';
import { Settings } from './components/settings/Settings';
import { Notification } from './components/notification/Notification';
import { Refer } from './components/ReferAndEarn/Refer';
import { AdminLogin } from './components/AdminPages/AdminLogins/AdminLogin';
import { AdminNavbar } from './components/AdminPages/AdminHome/AdminNavbar';
import { AdminSidebar } from './components/AdminPages/AdminHome/AdminSidebar';
import { TransactionalAnalytics } from './components/AdminPages/TransactionAnalytics/TransactionalAnalytics';
import { LeaderBoard } from './components/leaderboard/LeaderBoard';
import { Wallet } from './components/wallet/Wallet';
import { Deposit } from './components/wallet/Deposit';
import { Withdraw } from './components/wallet/Withdraw';
import { UTR } from './components/wallet/UTR';
import { WithdrawAmount } from './components/wallet/WithdrawAmount';
import { EnterWithdraw } from './components/wallet/EnterWithdraw';
import { Profile } from './components/profile/Profile';
import { Help } from './components/help/Help';
import { CoinSwitch } from './components/games/CoinSwitch';
import { Trader } from './components/games/Trader';
import { Gamenav } from './components/games/Gamenav';
import { GameResult } from './components/games/GameResult';
import { AdminHome } from './components/AdminPages/AdminHome/AdminHome';
import { ViewUser } from './components/AdminPages/AdminHome/ViewUser';
import { AdminDeposit } from './components/AdminPages/AdminHome/AdminDeposit';
import { AutomaticDeposit } from './components/AdminPages/AdminDeposits/AutomaticDeposit';
import { ManualDeposit } from './components/AdminPages/AdminDeposits/ManualDeposit';
import { ViewUserTransaction } from './components/AdminPages/AdminDeposits/ViewUserTransaction';
import { ViewUserManualTransaction } from './components/AdminPages/AdminDeposits/ViewUserManualTransaction';
import { AdminWithdraw } from './components/AdminPages/AdminWithdraws/AdminWithdraw';
import { ViewUserWithdrawTransaction } from './components/AdminPages/AdminWithdraws/ViewUserWithdrawTransaction';
import { ChooseWinningTeam } from './components/ChooseWinningTeams/ChooseWinningTeam';
import { DemoAccount } from './components/AdminPages/Demo/DemoAccount';
import { DepositAmount } from './components/wallet/DepositAmount';
import { CandleChart } from './components/games/CandleChart';
import { Verification } from './components/register/Verification';
import { ForgotVerification } from './components/register/ForgotVerification';
import { Forgotpassword } from './components/login/Forgotpassword';
import { DepositManually } from './components/wallet/DepositManually';
import { ToastContainer } from 'react-toastify';





function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Logopage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgotPassword' element={<Forgotpassword />} />
          <Route path="/register" element={<Register />} />
          <Route path='/verification' element={<Verification />} />
          <Route path='/forgotVerification' element={<ForgotVerification />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path='/betslip' element={<BetSlip />} />
          <Route path='/home' element={<Home />} />
          <Route path='/history' element={<History />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/refer' element={<Refer />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/adminHome' element={<AdminHome />} />
          <Route path='/adminNavbar' element={<AdminNavbar />} />
          <Route path='/adminSidebar' element={<AdminSidebar />} />
          <Route path='/depositAmount' element={<DepositAmount />} />
          <Route path='/transactionalAnalysis' element={<TransactionalAnalytics />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/depositManually' element={<DepositManually />} />
          <Route path='/withdraw' element={<Withdraw />} />
          <Route path='/utrNumber' element={<UTR />} />
          <Route path='/withdrawAmount' element={<WithdrawAmount />} />
          <Route path='/enterWithdraw' element={<EnterWithdraw />} />
          <Route path='/help' element={<Help />} />
          <Route path='/coinSwitch' element={<CoinSwitch />} />
          <Route path='/trader' element={<Trader />} />
          <Route path='/gameNav' element={<Gamenav />} />
          <Route path='/gameResult' element={<GameResult />} />
          <Route path="/viewUser/:uid" element={<ViewUser />} />
          <Route path="/viewUserTransaction/:uid" element={<ViewUserTransaction />} />
          <Route path='viewUserManualTransaction/:uid' element={<ViewUserManualTransaction />} />
          <Route path='/viewUserWithdrawTransaction/:uid' element={<ViewUserWithdrawTransaction />} />
          <Route path='/adminDeposit' element={<AdminDeposit />} />
          <Route path='/automaticDeposit' element={<AutomaticDeposit />} />
          <Route path='/manualDeposit' element={<ManualDeposit />} />
          <Route path='/adminWithdraw' element={<AdminWithdraw />} />
          <Route path='/chooseWinningTeam' element={<ChooseWinningTeam />} />
          <Route path='demoAccount' element={<DemoAccount />} />
          <Route path='/candleChat' element={<CandleChart />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;

import { format } from 'date-fns';
import Link from 'next/link';
const MatchCard = ({ match }) => {
  // Format the match date for better readability
  // const formattedDate = match.match_date
  //   ? format(new Date(match.match_date), 'MMMM dd, yyyy')
  //   : 'Date not available';

  return (
    <Link href={`/matches/${match.id}`} passHref className='hover:scale-105'>
    <div className="match-card">
      <div className="teams">
        <div className="team">
          {match.home_team?.logo && (
            <img src={match.home_team.logo} alt={`${match.home_team.name} logo`} className="team-logo" />
          )}
          <span>{match.home_team?.name || 'Home Team'}</span>
        </div>
        <span className="vs">vs</span>
        <div className="team">
          {match.away_team?.logo && (
            <img src={match.away_team.logo} alt={`${match.away_team.name} logo`} className="team-logo" />
          )}
          <span>{match.away_team?.name || 'Away Team'}</span>
        </div>
      </div>
      <p className="match-date">Date: {match.match_date}</p>
      <Link href="/tickets" className="text-red-500 font-semibold hover:font-bold">Buy Tickets Now</Link>
      <style jsx>{`
        .match-card {
          border: 1px solid #ccc;
          padding: 1rem;
          border-radius: 5px;
          background-color: #f9f9f9;
          margin-bottom: 1rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .teams {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 1rem;
        }
        .team {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .team-logo {
          width: 50px;
          height: 50px;
          object-fit: contain;
          margin-bottom: 0.5rem;
        }
        .vs {
          font-weight: bold;
          font-size: 1.2rem;
          color: #333;
        }
        .match-date {
          color: #666;
        }
      `}</style>
      </div>
    </Link>
  );
};

export default MatchCard;

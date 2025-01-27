import { bebas_neue } from '../fonts/fonts';

const ResultCard = ({ match }) => {
    return (
        <article className="flex flex-col items-center">
            <p className={`${bebas_neue.className} text-xl text-left`}>{match.match_date}</p>
             <div className="flex  p-4 justify-around">
                <div className="team">
                {match.home_team?.logo && (
                    <img src={match.home_team.logo} alt={`${match.home_team.name} logo`} className="team-logo" />
                )}
                <span className='font-bold'>{match.home_team?.name || 'Home Team'}</span>
                </div>
                <p className="text-red-600 font-bold text-2xl px-3">{match?.home_score} - {match?.away_score}</p>
                <div className="team px-2">
                {match.away_team?.logo && (
                    <img src={match.away_team.logo} alt={`${match.away_team.name} logo`} className="team-logo" />
                )}
                <span className='font-bold'>{match.away_team?.name || 'Away Team'}</span>
                </div>
            </div>
            
        </article>
    )
}
export default ResultCard;
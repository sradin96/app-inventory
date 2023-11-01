import { variable } from '../../../consts/consts';
import'./styles.scss';

const Banner = () => {
	return (
		<section className='banner'>
			<div className="wrap">
				<h1>Banner</h1>
				<p>{variable}</p>
			</div>
		</section>
	)
}

export default Banner

import { FC } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Sectors: FC = () => {
  return (
    <div>
      <Result
        title="敬请期待~"
        extra={
          <Button type="primary" key="home">
            <Link to='/ohmyfil'>Home</Link>
          </Button>
        }
      />,
    </div>
  )
};

export default Sectors;

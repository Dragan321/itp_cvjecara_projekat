import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Slider } from '@mui/material';
import { Stack } from '@mui/system';
import ReactShowMoreText from 'react-show-more-text';

export default function CardBuket({ img, naziv, sadrzaj, maxKolicina, cijena, cartItemsBuketi, setCartItemsBuketi, buket, setCartUkupnaCjena, cartUkupnaCjena, setCartItemsCount, cartItemsCount, opis }) {
    const [kolicina, setKolicina] = useState(1);
    const [kolicinaMax, setKolicinaMax] = useState(maxKolicina);
    const [cijenaUkupno, setCijenaUkupno] = useState(cijena);
    const [disableButton, setDisableButton] = useState(false)
    const handleChange = (event, newValue) => {
        if (typeof newValue === 'number') {
            if (kolicinaMax == 0) {
                setKolicina(0);

                setCijenaUkupno(Math.round(cijena * 100) / 100);
            }
            else {
                setKolicina(newValue);
                setCijenaUkupno(Math.round(newValue * cijena * 100) / 100);
            }
        }
    }
    function dodajUCart() {

        var kolicinaMaxpom = kolicinaMax - kolicina

        setKolicinaMax(kolicinaMaxpom)
        buket.kolicina = kolicinaMaxpom
        if (kolicinaMaxpom > 0) {
            setKolicina(1)

        }
        else {
            setCijenaUkupno(cijena);
            setKolicina(0);
            setDisableButton(true)
        }
        if (kolicina > 0) {
            var duplikat = cartItemsBuketi.filter((cartItem) => cartItem.buket == buket)
            if (duplikat.length > 0) {
                duplikat[0].kolicina += kolicina
                setCartItemsBuketi(cartItemsBuketi.filter((cartItem) => cartItem.buket != buket))
                setCartItemsBuketi([...cartItemsBuketi], duplikat[0])
                setCartItemsCount(cartItemsCount + kolicina)

            }
            else {
                setCartItemsCount(cartItemsCount + kolicina)
                setCartItemsBuketi([...cartItemsBuketi, { buket, kolicina, setKolicinaMax, kolicinaMaxpom, sadrzajBuketa }])
            }
            setCartUkupnaCjena(cartUkupnaCjena + kolicina * cijena)
        }
    }
    useEffect(() => {
        if (kolicinaMax > 0) {
            setKolicina(1)

        }
        else {
            setCijenaUkupno(cijena);
            setKolicina(0);
            setDisableButton(true)
        }
    }, []);
    var sadrzajBuketa = ''
    for (let item in sadrzaj) {
        sadrzajBuketa += ' ' + sadrzaj[item].expand['id_cvijeta'].naziv + ' x' + sadrzaj[item].kolicina

    }


    return (
        <Card sx={{ marginTop: '15px' }}>
            <CardActionArea sx={{ height: '100%' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={img}
                />
                <CardContent sx={{ height: '100%', marginTop: '15px' }}>
                    <Stack spacing={1}>
                        <Typography gutterBottom variant="h5" component="div">
                            {naziv}
                        </Typography>
                        <ReactShowMoreText lines={1} more={"More"} less={"less"}>
                            <Typography variant="body2" color="text.secondary" >
                                {opis}
                            </Typography>
                        </ReactShowMoreText>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: '2.5ex', height: '7.5ex' }}>
                            {'Sadrzaj: ' + sadrzajBuketa}
                        </Typography>
                        {!disableButton ? (<Typography id="non-linear-slider" gutterBottom>
                            Kolicina:{kolicina}
                        </Typography>) : (<Typography id="non-linear-slider" gutterBottom color={'red'}>Nema na stanju</Typography>)}

                        <Slider
                            value={kolicina}
                            min={0}
                            step={1}
                            max={kolicinaMax}
                            disabled={disableButton}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="non-linear-slider"
                        />
                        <Typography id="non-linear-slider" gutterBottom>
                            Cijena: {cijenaUkupno + ' KM'}
                        </Typography>
                        <Button fullWidth size="small" color="primary" variant='contained' onClick={() => dodajUCart()} disabled={disableButton}>
                            Dodaj u korpu
                        </Button>
                    </Stack>
                </CardContent>
            </CardActionArea>

        </Card >
    );



}
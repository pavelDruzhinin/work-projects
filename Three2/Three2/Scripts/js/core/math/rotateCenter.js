(function ($m) {

    $m.rotateCenter = function (x0, y0, x, y, angle) {
        var T0 = new Matrix(3, 3);
        T0.set(1, 0, x0, 0, 1, y0, 0, 0, 1);

        var T1 = new Matrix(3, 3);
        T1.set(1, 0, -x0, 0, 1, -y0, 0, 0, 1);

        var Rangle = new Matrix(3, 3);
        var cosAngle = $m.cos(angle);
        var sinAngle = $m.sin(angle);

        Rangle.set(cosAngle, -sinAngle, 0, sinAngle, cosAngle, 0, 0, 0, 1);

        var transp = new Matrix(3, 1);
        transp.set(x, y, 1);

        T0.multiply(Rangle);
        T0.multiply(T1);
        T0.multiply(transp);

        return { x: T0.get(0, 0), y: T0.get(0, 1) };
    }

})(Math);